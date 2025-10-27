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
