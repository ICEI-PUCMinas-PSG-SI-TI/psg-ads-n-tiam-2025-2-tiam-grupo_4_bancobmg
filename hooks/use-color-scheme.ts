import { useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme(): 'light' | 'dark' {
  // fallback para 'light' caso seja undefined
  return _useColorScheme() ?? 'light';
}

