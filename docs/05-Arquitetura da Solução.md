# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

<img width="" height="" alt="image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/1590064888a3914d3446cff56a2661984a402d55/docs/img/Diagrama%20de%20Classes%20Banco%20BMG.png" />

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa. No centro deste sistema, encontramos a entidade Cliente, que, após o cadastro, tem a capacidade de interagir com diversas funcionalidades da plataforma.

O diagrama detalha que cada cliente possui um SaldoFGTS e uma ContaBancaria associada, indicando que o propósito principal da aplicação é permitir ao usuário realizar uma SolicitacaoSaque desses valores.

Além da operação financeira principal, o modelo descreve um ecossistema de suporte e engajamento: o cliente recebe Notificacao, participa de um ProgramaIndicacao e utiliza o SuporteChat para atendimento. Por fim, a entidade Administrador supervisiona o sistema, com a capacidade de gerar um RelatorioUso para monitorar as atividades na plataforma.]

<img width="1393" height="587" alt="image" src="https://github.com/user-attachments/assets/7dc79413-200b-440f-ba6f-4ce5a0e0ff05" />

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
<img width="" height="" alt="image" src="https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/8ed76ed7cdd02abc8756291e82e77a3aebae26a6/docs/img/Modelo%20Relacional.png" />

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

<span><a href="../src/bd/banco.sql">Link Modelo Físico </a></span>

## Tecnologias Utilizadas

Para esta solução, utilizaremos o React Native para desenvolver a aplicação móvel, no ambiente de desenvolvimento VS Code, utilizando banco de dados relacional MySQL que se comunicará com o Firebase.

<img width="1265" height="567" alt="image" src="https://github.com/user-attachments/assets/ea1bffa7-422f-4559-b853-3fff7d1e06b2" />


## Hospedagem

A arquitetura da solução é baseada no modelo **Cliente-Servidor**. Ela é composta por:

* **Front-end:** Um aplicativo móvel nativo, desenvolvido em **React Native**. Este aplicativo é compilado e distribuído diretamente para os dispositivos dos usuários.

* **Back-end:** Um servidor que expõe uma **Rest API** para o aplicativo cliente.

* **Banco de Dados:** Um banco de dados relacional **MySQL** que armazena os dados da aplicação e se comunica com o Back-end.

* **Serviços Auxiliares:** A plataforma **Firebase** é utilizada para funcionalidades de apoio, como autenticação de usuários e recebimento de dados.

A documentação não especifica o provedor de nuvem ou a plataforma onde o Back-end e o banco de dados MySQL serão hospedados.

O front-end, por ser um aplicativo nativo, não é "hospedado", mas sim compilado para ser distribuído diretamente aos dispositivos dos usuários.

## Qualidade de Software

Com base na norma **ISO/IEC 25010**, foram selecionadas as seguintes sub-características para nortear o desenvolvimento do projeto, garantindo um produto final que atenda às expectativas de negócio e dos usuários.

#### 1. Característica: Manutenibilidade

* **Sub-característica Escolhida:** Modificabilidade
* **Justificativa:** A arquitetura foi projetada em camadas (Front-end e Back-end desacoplados) justamente para permitir que o sistema evolua. É crucial que novas funcionalidades possam ser adicionadas ou que as regras de negócio possam ser alteradas no futuro com o mínimo de impacto e sem introduzir defeitos no sistema.
* **Métricas de Avaliação:**
    * Tempo médio para adicionar uma nova funcionalidade simples: Medir as horas de desenvolvimento para implementar uma nova tela ou endpoint.
    * Número de bugs reportados após uma atualização: Contagem de defeitos criados em funcionalidades existentes após a implantação de uma nova versão.

#### 2. Característica: Confiabilidade

* **Sub-característica Escolhida:** Tolerância a Falhas
* **Justificativa:** O sistema lida com operações financeiras e dados de usuários, não podendo parar de funcionar por erros inesperados (ex: tentativa de saque com valor inválido, falha de conexão com o banco). O back-end precisa ser capaz de tratar exceções de forma adequada, registrar os erros e manter a aplicação em funcionamento.
* **Métricas de Avaliação:**
    * Percentual de requisições à API com erro (status 5xx): Monitorar a quantidade de erros internos do servidor em relação ao total de requisições.
    * Tempo médio de recuperação (MTTR): Medir quanto tempo o sistema leva para se recuperar após uma falha crítica.

#### 3. Característica: Segurança

* **Sub-característica Escolhida:** Integridade
* **Justificativa:** A integridade dos dados é vital. A aplicação deve garantir que as informações (como saldo, dados pessoais, etc.) não possam ser modificadas de forma acidental ou maliciosa. A modelagem de dados relacional e as validações no back-end são as principais estratégias para garantir essa integridade.
* **Métricas de Avaliação:**
    * Número de vulnerabilidades encontradas em testes de SQL Injection: Realizar testes de segurança periódicos.
    * Logs de acesso negado: Contagem de tentativas de alteração de dados por usuários sem a devida permissão.
