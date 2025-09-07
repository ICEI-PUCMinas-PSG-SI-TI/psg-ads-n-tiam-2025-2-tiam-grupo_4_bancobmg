# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Este documento detalha as especificações do projeto para a criação de uma solução digital de acompanhamento do FGTS, definindo o escopo a partir da perspectiva do usuário. Para realizar este levantamento, foram utilizadas técnicas de elicitação de requisitos como a criação de Personas, para personificar os usuários-alvo; a elaboração de Histórias de Usuários, para capturar as necessidades e funcionalidades desejadas; e a derivação de Requisitos Funcionais e Não Funcionais, para formalizar o comportamento e as qualidades do sistema.

## Personas
1- Maria, 27 anos, auxiliar administrativa.

Maria trabalha em um escritório e tem uma rotina diária cheia de tarefas, horários fixos e responsabilidades financeiras. Ela utiliza o FGTS como uma alternativa de apoio em momentos de emergência. Apesar de estar familiarizada com aplicativos bancários, Maria se sente desmotivada quando precisa enfrentar processos longos. Ela valoriza soluções soluções rápidas e descomplicadas.


<div align="center">
<img src="https://github.com/user-attachments/assets/2b37deb4-034a-4907-a224-2946efdf4332"   width="400px" />
</div>


2-Rafael, 32 anos, técnico em manutenção .


Rafael,  trabalha como técnico em manutenção e tem uma rotina bastante corrida. Entre visitas a clientes, consertos e emergências no trabalho, ele precisa de soluções rápidas para gerenciar suas finanças. Como não tem muito tempo sobrando, busca um aplicativo que seja ágil e intuitivo, permitindo consultar seu saldo e realizar operações financeiras essenciais em poucos cliques.

<div align="center">
<img src="https://github.com/user-attachments/assets/4344f70d-0e75-471f-975f-d6ae162e4238"  width="300px" />
</div>

3-Juliana,24 anos,recepcionista:


Trabalha como recepcionista e está planejando uma viagem internacional nas próximas férias. Para alcançar esse objetivo, vê no FGTS uma oportunidade de juntar recursos extras de forma prática. Ela precisa de um aplicativo claro, confiável e seguro, que a acompanhe passo a passo no processo de saque, garantindo que cada etapa seja simples.
<div align="center">
<img src="https://github.com/user-attachments/assets/ac85a12d-87f2-4abf-a8f2-72fdfd2bcf71"  width="300px" />
</div>


4-Carlos, 45 anos, empresário. 

Carlos,é empresário e acompanha de perto suas finanças. Acessa o FGTS com frequência e valoriza poder realizar saques de forma autônoma, sem depender de terceiros. Prefere aplicativos que ofereçam notificações sobre saldo disponível e etapas claras, garantindo segurança e controle sobre cada movimentação financeira.
<div align="center">
<img src="https://github.com/user-attachments/assets/9efd1eef-0eec-4e12-aa51-67f4e0de1962"  width="300px" />
</div>


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA`     | QUERO/PRECISO ... `FUNCIONALIDADE`                                                                        | PARA ... `MOTIVO/VALOR`                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| cliente do sistema       | realizar meu cadastro utilizando o CPF como identificador único | garantir segurança, evitar duplicidade de contas e ter acesso ao sistema  |
| cliente do sistema       | escolher em qual conta desejo receber o saldo no momento da solicitação de saque| ter flexibilidade e controle sobre meu recebimento                                    |
| administrador do sistema | que o sistema verifique se o cliente possui autorização para visualizar informações do FGTS | garantir o uso correto dos recursos financeiros e cumprir regras de acesso |
| cliente do sistema       | solicitar a liberação do meu FGTS| acessar meus recursos financeiros quando necessário|
| cliente do sistema       | visualizar meu saldo de FGTS logo na tela inicial | ter acesso rápido e fácil à informação principal |
| cliente do sistema | visualizar uma tabela com os valores disponíveis do meu FGTS e seus respectivos anos  | acompanhar melhor a evolução do meu saldo ao longo do tempo|
| cliente do sistema       | receber notificações automáticas (diárias às 6h e push em tempo real) sobre atualização do saldo| me manter sempre informado sem precisar acessar o app constantemente|
| administrador do sistema | gerar relatórios sobre quantos clientes utilizam o app, com possibilidade de exportar para BI ou planilha | analisar métricas de uso e apoiar decisões estratégicas|
| cliente do sistema       | que o sistema atualize meu saldo automaticamente em horários programados (ex.: pela manhã)| garantir que as informações estejam sempre atualizadas sem necessidade de ação manual |
| cliente do sistema       | solicitar saque por meio de um fluxo totalmente autônomo no app| ganhar agilidade e autonomia, sem precisar de intervenção manual     |
| cliente do sistema       | gerenciar minhas contas bancárias cadastradas para recebimento | organizar melhor onde desejo receber meus valores                     |
| cliente do sistema       | participar de um programa de indicação com rastreamento de downloads e bonificação | obter recompensas por indicar novos usuários e ajudar a expandir o uso do app         |
| cliente do sistema       | acessar um chat de suporte dentro do app | resolver dúvidas e problemas de forma rápida e prática |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 


| Indicador                            | Objetivos                                               | Descrição                                                                      | Cálculo                                        | Fonte de dados           | Perspectiva               |
| ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------- | ------------------------ | ------------------------- |
| Taxa de erro no cadastro (CPF)       | Garantir qualidade e evitar duplicidade                 | Percentual de cadastros rejeitados por inconsistência ou duplicidade           | (erros / total cadastros) \* 100               | Base de cadastros        | Aprendizado e Crescimento |
| Percentual de consultas ao saldo     | Medir uso da funcionalidade principal                   | Percentual de clientes que acessam saldo FGTS em relação ao total ativo no app | (clientes consulta / clientes ativos) \* 100   | Log de acessos           | Clientes                  |
| Taxa de saque concluído              | Avaliar efetividade da solicitação de saque             | Mede a % de solicitações de saque concluídas sem erro                          | (saques concl. / total saques) \* 100          | Tabela transações        | Processos internos        |
| Tempo médio de atualização saldo     | Avaliar desempenho da integração com API do Banco Lotus | Tempo médio que o sistema leva para atualizar saldo após requisição            | (Σ tempo respostas) / nº requisições           | Logs API Banco           | Processos internos        |
| Disponibilidade do app (%)           | Medir estabilidade da aplicação                         | Percentual de tempo que o app ficou disponível sem falhas                      | (tempo disponível / tempo total) \* 100        | Monitoramento servidores | Processos internos        |
| Taxa de entrega de notificações      | Avaliar efetividade do sistema de push                  | Mede % de notificações enviadas com sucesso em relação às programadas          | (notif. entregues / notif. programadas) \* 100 | Log de notificações      | Clientes                  |
| Engajamento no programa de indicação | Avaliar impacto do programa de indicação                | Percentual de novos cadastros feitos via indicação                             | (cadastros indicação / total cadastros) \* 100 | Tabela cadastros         | Crescimento               |
| Tempo médio de atendimento no chat   | Medir agilidade do suporte                              | Tempo médio de resposta do suporte via chat dentro do app                      | (Σ tempo resposta) / nº atendimentos           | Logs chat                | Clientes                  |
| Satisfação do usuário (NPS)          | Medir satisfação geral com o app                        | Índice de recomendação calculado a partir da pesquisa NPS                      | %Promotores - %Detratores                      | Pesquisa no app          | Clientes                  |



Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                                                                                                             | Prioridade |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RF-001 | O sistema deve permitir que o cliente realize cadastro utilizando o CPF como identificador.| ALTA       |
| RF-002 | O sistema deve permitir que o usuário escolha em qual conta deseja receber o saldo no momento da solicitação de saque.| ALTA       |
| RF-003 | O sistema deve verificar se o cliente possui autorização para visualizar informações do FGTS. | ALTA       |
| RF-004 | O sistema deve exibir o saldo do FGTS do cliente na tela inicial. | MÉDIA      |
| RF-005 | Caso o cliente possua saldo, o sistema deve apresentar uma tabela com os valores disponíveis e os respectivos anos. | MÉDIA      |
| RF-006 | O sistema deve enviar notificações sobre saldo atualizado, incluindo notificação diária às 6h e push em tempo real quando houver saldo disponível. | MÉDIA      |
| RF-007 | O sistema deve gerar relatórios de quantos clientes utilizam o app, permitindo exportação para BI ou planilha.| ALTA       |
| RF-008 | O sistema deve integrar com a API do Banco Lotus para consulta de saldo. | ALTA       |
| RF-009 | O sistema deve implementar agendamento de atualização matinal de saldos.| ALTA       |
| RF-010 | O sistema deve criar fluxo autônomo de solicitação de saque.| ALTA       |
| RF-011 | O sistema deve disponibilizar módulo de gerenciamento de conta bancária para recebimento.| MÉDIA      |
| RF-012 | O sistema deve criar programa de indicação com rastreamento de downloads e bonificação.| MÉDIA      |
| RF-013 | O sistema deve integrar chat de suporte dentro do app.| BAIXA      |



### Requisitos não Funcionais


| ID      | Descrição do Requisito                                                                                                                     | Prioridade |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| RNF-001 | O sistema deve utilizar cache de até 24 horas para otimizar a consulta de saldos e evitar sobrecarga.                                      | MÉDIA      |
| RNF-002 | A interface deve ser simples e intuitiva.                                                                                                  | ALTA       |
| RNF-003 | O sistema deve informar ao usuário, em tempo real, caso o tempo de resposta esteja maior do que o normal, dependendo do horário de acesso. | BAIXA      |
| RNF-004 | O app deve garantir disponibilidade mínima (ex.: 99%) e apresentar mensagens adequadas em caso de falhas.                                  | MÉDIA      |
| RNF-005 | O tempo de resposta da API de consulta de saldo deve ser inferior a 3 segundos.                                                            | ALTA       |
| RNF-006 | O app deve ser compatível com as versões mais recentes do iOS e Android.                                                                   | MÉDIA      |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deve utilizar a API do banco Lotus como fonte de dados primária para o saldo |
|02| O processo de formalização (selfie e documentos) pode exigir a integração com um sistema externo específico, impondo restrições de desenvolvimento       |
| 03  | A paleta de cores (amarelo e preto) e a marca do parceiro (BMG) são definidas pelo marketing e não são negociáveis |
## Diagrama de Casos de Uso

O Diagrama de Casos de Uso é elaborado após a elicitação dos requisitos e tem como objetivo representar, de forma visual, as funcionalidades que o sistema deve oferecer. Esse artefato utiliza uma notação gráfica padronizada para demonstrar:
a fronteira do sistema;
os atores envolvidos (usuários ou sistemas externos);
os casos de uso (funcionalidades disponibilizadas);
os relacionamentos entre atores e casos de uso.

Esse diagrama facilita a compreensão tanto por parte da equipe técnica quanto dos stakeholders, pois descreve de maneira simples e acessível as interações entre o usuário e o sistema. Além disso, complementa a tabela de requisitos funcionais, detalhando-os de forma visual e servindo como base para etapas posteriores de análise e modelagem.
<div align="center">
<img width="1092" height="1701" alt="image" src="https://github.com/user-attachments/assets/99187b53-6f1d-4b67-afcd-0f3019373c2d" />
</div>

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

|                                                    | RF-01 | RF-02 | RF-03 | RF-04 | RF-05 | RF-06 | RF-07 | RF-08 | RF-09 | RF-10 | RF-11 | RF-12 | RF-13 | RNF-01 | RNF-02 | RNF-03 | RNF-04 | RNF-05 | RNF-06 |
| -------------------------------------------------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ------ | ------ | ------ | ------ | ------ | ------ |
| **RF-01 – Cadastro de Cliente com CPF**            | X     | x     | x     | x     | x     | x     |       |       |       |       |       |       |       | X      | X      |        | X      |        | X      |
| **RF-02 – Escolha da Conta para Saque**            | X     | X     |       |       |       |       |       |       |       | x     | x     |       |       | X      | X      |        | X      |        | X      |
| **RF-03 – Consulta de Autorização**                | X     |       | X     | X     |       |       |       | x     |       |       |       |       |       | X      |        |        | X      | X      | X      |
| **RF-04 – Liberação de FGTS**                      | X     |       | X     | X     |       |       |       | x     |       | x     |       |       |       | X      |        |        | X      | X      | X      |
| **RF-05 – Exibição de Saldo na Página Inicial**    | X     |       |       |       | X     | X     | X     | X     | X     |       |       |       |       | X      | X      | X      | X      | X      | X      |
| **RF-06 – Geração de Tabela com Saldos e Anos**    | X     |       |       |       | X     | X     |       | X     |       |       |       |       |       | X      | X      |        | X      | X      | X      |
| **RF-07 – Notificações Automáticas (Diária/Push)** |       |       |       |       | X     |       | X     |       | X     |       |       |       |       | X      |        | X      | X      | X      | X      |
| **RF-08 – Relatório de Uso (BI/Planilha)**         |       |       |       |       |       |       |       | X     |       |       |       |       |       | X      | X      |        | X      |        | X      |
| **RF-09 – Agendamento de Atualização Matinal**     |       |       |       |       | X     |       | X     | X     | X     |       |       |       |       | X      |        |        | X      | X      | X      |
| **RF-10 – Fluxo Autônomo de Saque**                |    x   | X     |       | X     |       |       |       |       |       | X     | X     |       |       | X      |        |        | X      | X      | X      |
| **RF-11 – Gerenciamento de Conta Bancária**        |   x    | X     |       |       |       |       |       |       |       | X     | X     |       |       | X      |        |        | X      |        | X      |
| **RF-12 – Programa de Indicação**                  |       |       |       |       |       |       |       |       |       |       |       | X     |       |        | X      |        |        |        | X      |
| **RF-13 – Chat de Suporte Integrado**              |   x    |       |       |       |       |       |       |       |       |       |       |       | X     |        | X      | X      | X      |        | X      |
| **RNF-01 – Desempenho (Cache 24h)**                | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X      |        |        |        |        |        |
| **RNF-02 – Usabilidade**                           | X     | X     |       |       | X     | X     |       | X     |       | X     | X     | X     | X     |        | X      |        |        |        |        |
| **RNF-03 – Disponibilidade de Avisos**             |       |       |       |       | X     |       | X     |       | X     |       |       |       | X     |        |        | X      |        |        |        |
| **RNF-04 – Estabilidade (99%)**                    | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     |        |        |        | X      |        |        |
| **RNF-05 – Tempo de Resposta (<3s)**               |       |       | X     | X     | X     | X     | X     | X     | X     | X     |       |       |       |        |        |        |        | X      |        |
| **RNF-06 – Compatibilidade iOS/Android**           | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     | X     |        |        |        |        |        | X      |


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

### **Gerenciamento de Equipe**

| Nome | Função(ões) |
| :--- | :--- |
| Nitai Nandi | Scrum Master, Equipe de Desenvolvimento |
| Lucas de Paula | Product Owner, Equipe de Desenvolvimento |
| Gabriela Cristina| Equipe de Desenvolvimento |
| Mariana Martins | Equipe de Design, Equipe de Desenvolvimento|
| Pedro Henrique | Equipe de Desenvolvimento |
| Robson Marcolino| Equipe de Desenvolvimento |

---

## **Quadro de Tarefas**

### **Sprint 1**
*Atualizado em: 07/09/2025*

| Responsável | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Lucas de Paula | Definição do Backlog do Produto | 15/08/2025 | 07/09/2025 | ✔ | 29/08/2025 |
| Mariana Martins | Wireframes e Protótipo de Baixa Fidelidade | 15/08/2025 | 07/09/2025 | ✔ | 01/09/2025 |
| Gabriela Cristina| Configuração do Ambiente de Desenvolvimento | 15/08/2025 | 07/09/2025 | ✔ | 01/09/2025 |
| Pedro Henrique | Desenvolvimento do Módulo de Autenticação | ❌ | 30/10/2025 | 🏃 | | 
| Robson, Nitai, Pedro| Criação do Banco de Dados | 10/09/2025 | 25/10/2025 | 🏃 | |


**Legenda:**
* **✔** : terminado
* **🏃** : em execução
* **⌛** : atrasado
* **❌** : não iniciado

### **Sprint 2**
*Atualizado em: a definir*

| Responsável | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Mariana Martins | Protótipo de Alta Fidelidade e Style Guide | | | ❌ | |
| Lucas de Paula | Refinamento do Backlog e User Stories | | | ❌ | |
| Gabriela Cristina| Desenvolvimento do Dashboard Principal | | | ❌ | |
| Pedro Henrique | Integração de API Externa | | | ❌ | |
| Robson Marcolino| Implementação dos Testes Unitários | | | ❌ | |
| Nitai Nandi | Revisão de Código e Débitos Técnicos | | | ❌ | |

**Legenda:**
* **✔** : terminado
* **🏃** : em execução
* **⌛** : atrasado
* **❌** : não iniciado

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Image](https://github.com/user-attachments/assets/e1e83ccb-a82c-4747-8c7e-b864e9bb0eb7)

