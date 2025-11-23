import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
  Image, 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// --- IMPORTS DO FIREBASE (Descomente para usar no projeto real) ---
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; 

// Importar a função para popular dados
import { popularDadosExemplo } from "../scripts/populateData";

// --- FUNÇÕES AUXILIARES ---
//Função para formatar o CPF
const formatCPF = (value: string) => {
  // Remove tudo que não for dígito
  const numericValue = value.replace(/[^\d]/g, "");
  const truncatedValue = numericValue.slice(0, 11);
  // Aplica a máscara
  if (truncatedValue.length > 9) {
    return truncatedValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  } else if (truncatedValue.length > 6) {
    return truncatedValue.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
  } else if (truncatedValue.length > 3) {
    return truncatedValue.replace(/(\d{3})(\d{3})/, "$1.$2");
  }
  return truncatedValue;
};

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  // Estados
  const [cpf, setCpf] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estados da Splash Screen
  const [appIsReady, setAppIsReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Opacidade da Splash
  const scaleAnim = useRef(new Animated.Value(0.9)).current; // Pulsação do Logo na Splash

  // Animações de Entrada da Tela de Login
  const loginLogoY = useRef(new Animated.Value(-50)).current; // Logo vem de cima
  const loginLogoOpacity = useRef(new Animated.Value(0)).current;

  const loginInputY = useRef(new Animated.Value(50)).current; // Inputs vêm de baixo
  const loginInputOpacity = useRef(new Animated.Value(0)).current;

  const loginButtonY = useRef(new Animated.Value(50)).current; // Botões vêm de baixo (com delay)
  const loginButtonOpacity = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  // --- EFEITO 1: SPLASH SCREEN ---
  useEffect(() => {
    // Animação de "Respiração" do Logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Simula carregamento e transição
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setAppIsReady(true);
      });
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // --- EFEITO 2: ENTRADA DOS ELEMENTOS DE LOGIN ---
  useEffect(() => {
    if (appIsReady) {
      // Sequência de Animações (Stagger)
      Animated.parallel([
        // 1. Logo desce suavemente
        Animated.timing(loginLogoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(loginLogoY, { toValue: 0, friction: 6, useNativeDriver: true }),

        // 2. Inputs sobem (com pequeno delay)
        Animated.sequence([
            Animated.delay(200),
            Animated.parallel([
                Animated.timing(loginInputOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.spring(loginInputY, { toValue: 0, friction: 7, useNativeDriver: true }),
            ])
        ]),

        // 3. Botões sobem (com mais delay)
        Animated.sequence([
            Animated.delay(400),
            Animated.parallel([
                Animated.timing(loginButtonOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.spring(loginButtonY, { toValue: 0, friction: 7, useNativeDriver: true }),
            ])
        ])
      ]).start();
    }
  }, [appIsReady]);

  const handleCpfChange = (text: string) => {
    const formattedCpf = formatCPF(text);
    setCpf(formattedCpf);
  };

  // --- LÓGICA DE LOGIN ---
  // Função para verificar e criar saldo FGTS se não existir
  const verificarECriarSaldoFGTS = async (userId: string) => {
    try {
      // Verificar se já existe saldo FGTS para o usuário
      const saldoRef = collection(db, "saldos_fgts");
      const q = query(saldoRef, where("id_cliente", "==", userId), limit(1));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Se não existe saldo, criar dados de exemplo
        console.log("Criando saldo FGTS inicial para o usuário:", userId);
        await popularDadosExemplo(userId);
      } else {
        console.log("Saldo FGTS já existe para o usuário");
      }
    } catch (error) {
      console.error("Erro ao verificar/criar saldo FGTS:", error);
      // Não mostrar alerta para o usuário, pois isso não deve impedir o login
    }
  };

  // --- LÓGICA DE LOGIN COM CPF (FIREBASE + FIRESTORE) ---
  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert("Erro", "Por favor, preencha o CPF e a senha.");
      return;
    }
    setLoading(true);

    try {
      // --- PASSO 1: Achar o E-mail usando o CPF ---
      const cpfLimpo = cpf.replace(/[^\d]/g, "");
      const AdmRef = collection(db, "administradores");
      const clientesRef = collection(db, "clientes");

      const [querySnapshot1, querySnapshot2] = await Promise.all([
        getDocs(query(AdmRef, where("cpf", "==", cpfLimpo), limit(1))),
        getDocs(query(clientesRef, where("cpf", "==", cpfLimpo), limit(1)))
      ]);

      if (querySnapshot1.empty && querySnapshot2.empty) {
        Alert.alert("Erro", "CPF não encontrado.");
        setLoading(false);
        return;
      }

      let IsAdm = false;
      let uData;
      let emailDoUsuario;

      if (!querySnapshot1.empty) {
        uData = querySnapshot1.docs[0].data();
        emailDoUsuario = uData.email;
        IsAdm = true;
      } else {
        uData = querySnapshot2.docs[0].data();
        emailDoUsuario = uData.email;
        IsAdm = false;
      }

      const userCredential = await signInWithEmailAndPassword(auth, emailDoUsuario, senha);
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem("@user_token", token);

      const userData = {
        uid: userCredential.user.uid,
        email: emailDoUsuario,
        nome: uData.nome,
      };
      await AsyncStorage.setItem("@user_data", JSON.stringify(userData));

      if (IsAdm) router.replace("/ADM/home_ADM" as any);
      else 
      {
        // --- PASSO 4: VERIFICAR E CRIAR SALDO FGTS SE NÃO EXISTIR ---
        await verificarECriarSaldoFGTS(userCredential.user.uid);
        router.replace("../Home" as any);
      }
    } catch (error: any) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        Alert.alert("Erro", "Senha incorreta.");
      } else {
        console.error(error);
        Alert.alert("Erro", "Não foi possível fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER 1: SPLASH SCREEN ---
  if (!appIsReady) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        
        <LinearGradient
          colors={['#1F1F1F', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            {/* IMAGEM LOCAL - AUMENTADA PARA 300x300 */}
            <Image 
                source={require('../assets/images/LogoAcert.png')} 
                style={{ width: 300, height: 300 }} 
                resizeMode="contain" 
            />
        </Animated.View>
        
        <View style={{ marginTop: 50, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#FFC107" />
            <Text style={styles.loadingText}>CARREGANDO</Text>
        </View>
      </Animated.View>
    );
  }

  // --- RENDER 2: TELA DE LOGIN ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <LinearGradient
        colors={['#2C2C2C', '#121212', '#000000']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Logo Animado */}
        <Animated.View style={[
            styles.logoContainer, 
            { opacity: loginLogoOpacity, transform: [{ translateY: loginLogoY }] }
        ]}>
            {/* IMAGEM LOCAL - Usando estilo 'logo' aumentado */}
            <Image 
                source={require('../assets/images/LogoAcert.png')} // era "canvas.png"
                style={styles.logo} 
                resizeMode="contain" 
            />
        </Animated.View>

        <Text style={styles.title}>LOGIN</Text>

        {/* Inputs Animados */}
        <Animated.View style={{ 
            width: '100%', 
            opacity: loginInputOpacity, 
            transform: [{ translateY: loginInputY }] 
        }}>
            <View style={styles.inputGroup}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
                style={styles.input}
                placeholder="000.000.000-00"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={cpf}
                onChangeText={handleCpfChange}
                maxLength={14}
                editable={!loading}
            />
            </View>

            <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordInputContainer}>
                <TextInput
                style={styles.passwordInputField}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!isPasswordVisible}
                editable={!loading}
                />
                <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                disabled={loading}
                >
                <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="#888"
                    style={styles.eyeIcon}
                />
                </TouchableOpacity>
            </View>
            </View>
        </Animated.View>

        {/* Botões Animados */}
        <Animated.View style={{ 
            width: '100%', 
            alignItems: 'center',
            opacity: loginButtonOpacity, 
            transform: [{ translateY: loginButtonY }] 
        }}>
            <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            >
            {loading ? (
                <ActivityIndicator size="small" color="#000" />
            ) : (
                <Text style={styles.buttonText}>ENTRAR</Text>
            )}
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => router.push("/cadastro" as any)}
            disabled={loading}
            >
            <Text style={styles.linkText}>Cadastro</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => router.push("/recuperar-senha" as any)}
            disabled={loading}
            >
            <Text style={styles.linkText}>Esqueci minha senha</Text>
            </TouchableOpacity>
        </Animated.View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
      width: 320, // Aumentado para 320 (era 200)
      height: 180, // Aumentado para 180 (era 100)
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "left",
    width: "100%",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginLeft: 2,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  passwordInputContainer: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  passwordInputField: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#FFC107",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "#666",
    opacity: 0.6,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  linkText: {
    color: "#FFC107",
    fontSize: 15,
    marginTop: 15,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  // Splash Styles
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#FFC107",
    marginTop: 20,
    fontWeight: "bold",
    letterSpacing: 3,
    fontSize: 14,
  }
});
