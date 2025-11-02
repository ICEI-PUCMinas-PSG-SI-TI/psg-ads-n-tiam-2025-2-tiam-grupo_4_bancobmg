# Registro de Testes de Software

## Escopo

- Os testes abrangeram as funcionalidades de:
- Cadastro e atualização de contas bancárias (AlterarConta.tsx)
- Consulta de saldo FGTS e solicitação de saque (Saque.tsx)
-Todos os testes foram executados com usuário autenticado e banco de dados Firebase configurado.

## Resumo dos testes 
| Código   | Funcionalidade                       | Descrição do Teste                           | Resultado Esperado                               | Resultado Obtido | Responsável |
| -------- | ------------------------------------ | -------------------------------------------- | ------------------------------------------------ | ---------------- | ----------- |
| **CT01** | Carregar conta existente             | Abrir tela “Alterar Conta” e verificar dados | Exibir dados bancários do usuário                | **Sucesso**      | Pedro       |
| **CT02** | Cadastrar nova conta                 | Inserir dados e salvar                       | Criar nova conta na coleção `contas_bancarias`   | **Sucesso**      | Pedro       |
| **CT03** | Atualizar conta existente            | Alterar dados e salvar novamente             | Atualizar documento no Firestore                 | **Sucesso**      | Pedro       |
| **CT04** | Validar campos obrigatórios          | Tentar salvar com campos vazios              | Exibir mensagem de erro                          | **Sucesso**      | Pedro       |
| **CT05** | Cancelar operação                    | Tocar em “Cancelar”                          | Retornar à tela anterior                         | **Sucesso**      | Pedro       |
| **CT06** | Carregar saldo FGTS                  | Abrir tela “Saque” com usuário logado        | Exibir saldo disponível do Firestore             | **Sucesso**      | Pedro       |
| **CT07** | Solicitar saque válido               | Inserir valor e confirmar                    | Criar documento em `solicitacoes_saque`          | **Sucesso**      | Pedro       |
| **CT08** | Tentar sacar sem conta cadastrada    | Solicitar saque sem conta configurada        | Exibir mensagem pedindo cadastro de conta        | **Sucesso**      | Pedro       |
| **CT09** | Tentar sacar valor maior que o saldo | Inserir valor superior ao saldo atual        | Exibir alerta de “Saldo insuficiente”            | **Sucesso**      | Pedro       |
| **CT10** | Validar valor do saque               | Inserir valor 0 ou vazio                     | Exibir mensagem de erro “Digite um valor válido” | **Sucesso**      | Pedro       |
| **CT12** | Carregar Relatório Atual | Abrir página de relatórios | Atualizar o relatório atual e exibir suas informações | **Sucesso**  | Nitai |
| **CT13** | Carregar Relatório por Data | Inserir uma data e pesquisar um relatório | Exibir o relatório da data inserida, com suas informações | **Sucesso**  | Nitai |
| **CT14** | Carregar Solicitações | Abrir página de Autenticação Manual | Carregar as solicitações Pendentes | **Sucesso**  | Nitai |
| **CT15** | Deferir Solicitação | Selecionar o botão de Aceitar ou Negar solicitação | Altera o estado da solicitação e atualiza no banco de dados | **Sucesso**  | Nitai |
| **CT16** | Carregar Saldos FGTS | Abrir página de Saldo | Carregar e exibir todos os Saldos FGTS registrados no sistema | **Sucesso**  | Nitai |
| **CT17** | Alterar Saldo Manualmente | Alterar o Saldo de cliente registrado | Atualização do Saldo FGTS relacionado ao cliente | **Sucesso**  | Nitai |



## CT01 – Carregar conta existente

Descrição: Tela exibindo conta já salva no Firestore.
Resultado: Dados carregados com sucesso.

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/TelaMostrarSaque.jpeg" />

##  CT02 – Cadastrar nova conta

Descrição: Novo cadastro de conta bancária salvo com sucesso.
Resultado: Documento criado na coleção contas_bancarias.

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/TrocarConta.jpeg" />

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/FireBaseContaTrocada.png" />

##  CT03 – Atualizar conta existente

Descrição: Dados bancários modificados e salvos novamente.
Resultado: Firestore atualizado corretamente.

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/TrocarConta.jpeg" />

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/FireBaseContaTrocada.png" />

## CT04 – Validar campos obrigatórios

Descrição: Tentativa de salvar conta com campos vazios.
Resultado: Exibição de alerta informando erro de preenchimento.

<img alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/ErroPreenchercampos.jpeg" />


## CT05 – Cancelar operação

Descrição: Botão “Cancelar” retornando à tela anterior.
Resultado: Operação cancelada sem alteração de dados.

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/TrocarConta.jpeg" />


## CT06 – Carregar saldo FGTS

Descrição: Tela mostrando saldo atual do usuário.
Resultado: Saldo exibido corretamente após leitura do Firestore.

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/TelaMostrarSaque.jpeg" />

## CT07 – Solicitar saque válido

Descrição: Saque solicitado com valor dentro do saldo.
Resultado: Documento criado em solicitacoes_saque.

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/4ce0ac58c42303f13d5fadee4362792f82dc1329/docs/img/SucessoTrasferencia.jpeg" />

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/4ce0ac58c42303f13d5fadee4362792f82dc1329/docs/img/FireBaseSaque.png" />

## CT08 – Tentar sacar sem conta cadastrada

Descrição: Usuário tenta sacar sem conta configurada.
Resultado: Mensagem solicitando cadastro de conta exibida.

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/4ce0ac58c42303f13d5fadee4362792f82dc1329/docs/img/ErroSemconta.jpeg" />


## CT09 – Tentar sacar valor maior que o saldo

Descrição: Usuário insere valor superior ao saldo atual.
Resultado: Alerta de “Saldo insuficiente”.

<img  alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/ErroSaldoInsufuciente.jpeg" />

## CT10 – Validar valor do saque

Descrição: Tentativa de saque com valor inválido (0 ou vazio).
Resultado: Mensagem de erro exibida corretamente.

<img alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/ErroValor0.jpeg" />

## CT12 – Carregar Relatório Atual

Descrição: Quando o Administrador abre a página de relatórios, ou seleciona a data atual para carregar o relatório, ele calcula as informações do relatório, registram no banco de dados e exibem na tela.
Resultado: Atualizou o relatório atual e exibiu suas informações.

<img alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/a63cb712c5da0953049f766a9b3415dd1396a20b/docs/img/CT12-1.png" />
<img alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/docs/img/CT12-2.png" />

## CT13 – Carregar Relatório por Data

Descrição: Quando o Administrador seleciona uma data específica para carregar o relatório, ele busca as informações do relatório, se houver alguma naquele dia, e as exibem na tela.
Resultado: Exibiu corretamente as informações do relatório.

<img alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/CT13-1.png" />
<img alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/CT13-2.png" />

## CT14 – Carregar Solicitações

Descrição: Quando o Administrador abre a página de Autenticação Manual, o sistema busca por todas as solicitações de saque registradas, e lhe dá a opção de deferi-las.
Resultado: Exibiu corretamente as informações das solicitações.

<img alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/CT14.png" />

## CT15, CT16, CT17 – Deferir Solicitação, Carregar Saldos FGTS, Alterar Saldo Manualmente

Descrição: Na página de Autenticação manual, o administrador pode deferir as solicitações, aceitando ou negando-as. Na página de Saldo, o sistema exibe todos os saldos FGTS registrados no sistema, e um campo onde o administrador pode alterar este saldo manualmente.
Resultado: Aceitar as solicitações retirou corretamente o saldo da conta respectiva; Carregou os saldos corretamente, e o alterou com sucesso.

<img alt="Image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/550f28719940a0b6c58d41202172d3a5e973094b/docs/img/CT14151617.png" />



## Conclusão

- Todos os testes executados apresentaram resultado satisfatório, comprovando que:
- As funcionalidades estão integradas corretamente ao Firebase Firestore;
- As mensagens e validações de entrada funcionam conforme o esperado;
- Nenhum erro crítico foi identificado durante a execução.

- Resultado geral: Todos os 10 casos de teste aprovados com sucesso.
- Responsável pelos testes: Pedro
- Data de execução: 26/10/2025


> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
