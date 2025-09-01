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

Quer acessar o aplicativo de forma rápida para resolver necessidades financeiras imediatas. Valoriza um aplicativo ágil e intuitivo, que permita consultar saldo em poucos cliques.

<div align="center">
<img src="https://github.com/user-attachments/assets/4344f70d-0e75-471f-975f-d6ae162e4238"  width="300px" />
</div>

3-Juliana, 24 anos, recepcionista.

Pretende fazer uma viagem internacional nas férias e vê no FGTS uma oportunidade de juntar recursos extras para realizar esse objetivo. Precisa de um aplicativo claro e confiável que dê segurança em cada etapa do saque.

<div align="center">
<img src="https://github.com/user-attachments/assets/ac85a12d-87f2-4abf-a8f2-72fdfd2bcf71"  width="300px" />
</div>


4-Carlos, 45 anos, empresário. 

Acessa o FGTS com frequência e valoriza poder realizar saques de forma autônoma. Prefere aplicativos que ofereçam notificações sobre saldo disponível e etapas claras, para ter segurança e controle sobre suas finanças empresariais.
<div align="center">
<img src="https://github.com/user-attachments/assets/9efd1eef-0eec-4e12-aa51-67f4e0de1962"  width="300px" />
</div>




Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|cliente do sistema | realizar meu cadastro utilizando o CPF como identificador único|garantir segurança e evitar duplicidade de contas|
|cliente do sistema     | escolher em qual conta desejo receber o saldo no momento da solicitação de saque| ter flexibilidade e controle sobre meu recebimento|
|Administrador do sistema|que o sistema verifique se o cliente tenha autorização para visualizar informações do FGTS|utilizar os recursos financeiros quando for permitido|
|cliente do sistema |solicitar a liberação do meu FGTS|garantir segurança e evitar duplicidade de contas|
|cliente do sistema |visualizar meu saldo de FGTS logo na tela inicial  |garantir segurança e evitar duplicidade de contas      |
|cliente do sistema | realizar meu cadastro utilizando o CPF como identificador único         |ter acesso rápido e fácil à informação principal|
|cliente do sistema |visualizar uma tabela com os valores disponíveis do meu FGTS e seus respectivos anos |acompanhar melhor a evolução do meu saldo ao longo do tempo|
|cliente do sistema |receber notificações automáticas diárias às 6h da manhã sobre atualização do saldo|me manter sempre informado sem precisar acessar o app constantemente |
|administrador do sistema| gerar relatórios sobre quantos clientes utilizam o app, com possibilidade de exportar para BI ou planilha|analisar métricas de uso e apoiar decisões estratégicas|

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve permitir que o cliente realize cadastro utilizando o CPF como identificador | ALTA | 
|RF-002| O sistema deve permitir que o usuário escolha em qual conta deseja receber o saldo no momento da solicitação de saque.  |ALta |
|RF-003| O sistema deve verificar se o cliente possui autorização para visualizar informações do FGTS.| ALTA | 
|RF-004| O sistema deve exibir o saldo do FGTS do cliente na tela inicial. | MÉDIA |
|RF-005|Caso o cliente possua saldo, o sistema deve apresentar uma tabela com os valores disponíveis e os respectivos anos.| MÉDIA  | 
|RF-006| O sistema deve enviar notificação diária às 6h da manhã informando sobre atualização de saldo. | MÉDIA |
|RF-007| O sistema deve gerar relatórios de quantos clientes utilizam o app, permitindo exportação para BI ou planilha | ALTA | 

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve utilizar cache de até 24 horas para otimizar a consulta de saldos e evitar sobrecarga. | MÉDIA | 
|RNF-002| A interface deve ser simples e intuitiva|  ALTA | 
|RNF-003| O sistema deve informar ao usuário, em tempo real, caso o tempo de resposta esteja maior do que o normal, dependendo do horário de acesso.|  BAIXA | 
|RNF-004| O app deve garantir disponibilidade mínima (ex.: 99%) e apresentar mensagens adequadas em caso de falhas.|  MÉDIA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
| 04  | A aplicação deve funcionar em navegadores modernos e não requer compatibilidade com versões antigas |
| 05  | O projeto não deve ultrapassar o orçamento estipulado                                      |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

|                                                 | RF-01 | RF-02 | RF-03 | RF-04 | RF-05 | RF-06 | RF-07 | RF-08 | RNF-01 | RNF-02 | RNF-03 | RNF-04 |
| ----------------------------------------------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ------ | ------ | ------ | ------ |
| **RF-01 – Cadastro de Cliente com CPF**         | X     |    x   |    x   |    x   |  x     |  x     |     |       | X   | X      |        | X      |
| **RF-02 – Escolha da Conta para Saque**         |   X    | X     |       |       |       |       |       |       | X      | X      |        | X      |
| **RF-03 – Consulta de Autorização**             |  X     |       | X     | X     |       |       |       |       | X      |        |        | X      |
| **RF-04 – Liberação de FGTS**                   |  X     |       | X     | X     |       |       |       |       | X      |        |        | X      |
| **RF-05 – Exibição de Saldo na Página Inicial** |  X     |       |       |       | X     | X     | X     |       | X      | X      | X      | X      |
| **RF-06 – Geração de Tabela com Saldos e Anos** |  X     |       |       |       | X     | X     |       |       | X      | X      |        | X      |
| **RF-07 – Notificação Automática**              |       |       |       |       | X     |       | X     |       | X      |        | X      | X      |
| **RF-08 – Relatório de Uso (BI/Planilha)**      |       |       |       |       |       |       |       | X     | X      | X      |        | X      |
| **RNF-01 – Desempenho (Cache 24h)**             | X     | X     | X     | X     | X     | X     | X     | X     | X      |        |        |        |
| **RNF-02 – Usabilidade**                        | X     | X     |       |       | X     | X     |       | X     |        | X      |        |        |
| **RNF-03 – Disponibilidade de Avisos**          |       |       |       |       | X     |       | X     |       |        |        | X      |        |
| **RNF-04 – Estabilidade (99%)**                 | X     | X     | X     | X     | X     | X     | X     | X     |        |        |        | X      |




# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
