CREATE TABLE Administrador (
    id_admin INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50)
);

CREATE TABLE Cliente (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    senha VARCHAR(255),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ContaBancaria (
    id_conta INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    banco VARCHAR(50),
    agencia VARCHAR(20),
    numero_conta VARCHAR(20),
    tipo_conta VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE SaldoFGTS (
    id_saldo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    ano_ref INTEGER NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    fonte VARCHAR(50) DEFAULT 'BancoLotusAPI',
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE SolicitacaoSaque (
    id_saque INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    id_conta INTEGER NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) CHECK(status IN ('PENDENTE','CONCLUIDO','ERRO')),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_conta) REFERENCES ContaBancaria(id_conta)
);

CREATE TABLE Notificacao (
    id_notificacao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    mensagem TEXT NOT NULL,
    tipo VARCHAR(10) CHECK(tipo IN ('DIARIA','PUSH')),
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_envio VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE ProgramaIndicacao (
    id_indicacao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente_indicador INTEGER NOT NULL,
    id_cliente_indicado INTEGER NOT NULL,
    data_indicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_bonus VARCHAR(20),
    FOREIGN KEY (id_cliente_indicador) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_cliente_indicado) REFERENCES Cliente(id_cliente)
);

CREATE TABLE SuporteChat (
    id_chat INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    resposta TEXT,
    data_resposta DATETIME,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE RelatorioUso (
    id_relatorio INTEGER PRIMARY KEY AUTOINCREMENT,
    id_admin INTEGER NOT NULL,
    tipo VARCHAR(20) CHECK(tipo IN ('BI','PLANILHA')),
    data_geracao DATETIME DEFAULT CURRENT_TIMESTAMP,
    qtd_usuarios INTEGER,
    exportado BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_admin) REFERENCES Administrador(id_admin)
);
