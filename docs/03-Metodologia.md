
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

A metodologia de trabalho selecionada para este projeto será a Scrum, uma estrutura ágil que permite o desenvolvimento iterativo e incremental, ideal para um ambiente onde a agilidade e a capacidade de adaptação aos feedbacks são cruciais. A Scrum promove a entrega contínua de valor, garantindo que as funcionalidades mais importantes sejam desenvolvidas e validadas em ciclos curtos, chamados de Sprints, com duração de duas semanas.

A estrutura da equipe de desenvolvimento (Squad) será multifuncional, composta por:

- `Product Owner (PO):` Responsável por definir e priorizar as funcionalidades no backlog do produto.
- `Scrum Master:` Responsável por garantir que a equipe siga os princípios da metodologia e por remover quaisquer impedimentos.
- `Equipe de Desenvolvimento:` Profissionais de back-end, front-end (mobile), UI/UX e QA, responsáveis pela entrega técnica da solução.

## 🛠️ Relação de Ambientes de Trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. A relação dos ambientes com seu respectivo propósito e link de acesso é detalhada na tabela abaixo.

| Ambiente | Plataforma / Ferramenta | Link de Acesso (Exemplo) |
| :--- | :--- | :--- |
| **Controle de Versão** | Git / GitHub | `[https://github.com/sua-organizacao/nome-do-projeto](https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg)` |
| **Desenvolvimento Local** | Visual Studio Code | `N/A (Ferramenta Local)` |
| **Design (UI/UX)** | Figma | `https://www.figma.com/file/seu-projeto` |
| **Gestão Ágil (Scrum)** | GitHub Projects | `[https://github.com/orgs/sua-organizacao/projects/1](https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-tiam-grupo_4_bancobmg/blob/main/docs/04-Projeto%20de%20Interface.md)` |
| **Comunicação** | WhatsApp | `N/A (Grupo Privado)` |

### Ambientes e Frameworks para Desenvolvimento Móvel

Para o desenvolvimento da aplicação móvel, serão utilizados os seguintes ambientes e frameworks:

* **Framework:** **React Native**
* **Ambiente de Desenvolvimento (IDE):** **Visual Studio Code**
* **Plataforma de Build e Deploy:** **Expo**

**Justificativa:** A escolha pelo ecossistema React Native com Expo foi estratégica. Ela nos permite desenvolver para Android  a partir de um único código-base em JavaScript, otimizando o tempo da equipe. O Expo simplifica o processo de build, testes em dispositivos físicos e a publicação nas lojas, enquanto o Visual Studio Code oferece uma integração robusta e ágil para o desenvolvimento.

## 🔄 Controle de Versão

A gestão do código-fonte do projeto é realizada com a ferramenta de controle de versão **Git**, e o **GitHub** é utilizado como plataforma para hospedagem e colaboração do repositório.

### Configuração do Projeto no GitHub

O repositório foi configurado seguindo as melhores práticas para garantir a qualidade e a estabilidade do código. A configuração inicial incluiu:

1.  **Criação do Repositório:** O projeto foi iniciado no GitHub, estabelecendo um ponto central para todo o código.
2.  **Definição das Branches Principais:** As branches `main` e `dev` foram criadas. A branch `main` foi configurada como a branch padrão e protegida contra pushes diretos, exigindo que todas as alterações passem por um processo de Pull Request (PR) e revisão.
3.  **Estrutura de Etiquetas (Labels):** As etiquetas para a gerência de *issues* (`bug`, `feature`, `task`, etc.) foram cadastradas no repositório para padronizar a classificação das tarefas.

### Gerenciamento de Branches, Commits, Merges e Tags

Nosso fluxo de trabalho é baseado no modelo **GitFlow**, utilizando uma convenção clara para as branches, garantindo que o desenvolvimento, teste e lançamento de novas versões ocorram de forma organizada.

**Branches:**

* `main`: Representa a versão de produção. Contém apenas código estável e testado, sendo que cada *merge* nesta branch corresponde a uma nova versão em produção.
* `unstable`: Branch de pré-produção. Recebe funcionalidades que já foram testadas e aprovadas, aguardando o próximo ciclo de *release* para serem movidas para a `main`.
* `testing`: Ambiente dedicado aos testes de Qualidade (QA). É aqui que as novas funcionalidades são validadas antes de serem consideradas estáveis.
* `dev`: Branch principal de desenvolvimento. Todas as novas *features* e correções são integradas aqui a partir de suas próprias branches de funcionalidade.

**Commits:**

Adotamos a convenção de **Commits Semânticos**. Cada mensagem de commit é padronizada para descrever claramente a alteração realizada (ex: `feat: Adiciona login com e-mail`, `fix: Corrige validação de formulário`). Isso melhora a legibilidade do histórico e permite a automação de processos, como a geração de changelogs.

**Merges (Pull Requests):**

Nenhuma alteração é enviada diretamente para as branches `dev`, `testing` ou `main`. Todo o processo é realizado via **Pull Requests (PRs)**. Uma nova funcionalidade ou correção é desenvolvida em uma branch própria (ex: `feature/nova-tela-cadastro`) e, ao ser finalizada, um PR é aberto para a branch `dev`. O PR só é "mergeado" após a revisão e aprovação de pelo menos um outro membro da equipe, garantindo a qualidade do código.

**Tags:**

As **tags** são utilizadas para marcar os pontos de *release* na branch `main`. Cada vez que uma nova versão estável é lançada, uma tag semântica (ex: `v1.0.0`, `v1.1.0`) é criada, facilitando a consulta e a reversão para versões específicas do software no futuro.

### Gerenciamento de Issues com Quadro Kanban

A gestão de todas as demandas — sejam elas novas funcionalidades, tarefas técnicas, melhorias ou bugs — é centralizada nas **Issues** do GitHub. Para visualizar e gerenciar o fluxo de trabalho, utilizamos o **GitHub Projects** como um **quadro Kanban**.

O processo é o seguinte:

1.  **Criação da Issue:** Qualquer nova demanda é registrada como uma *issue*.
2.  **Etiquetagem e Priorização:** A *issue* recebe uma etiqueta para fácil identificação (`feature`, `bug`, `enhancement`, `task`, `documentation`) e é adicionada ao nosso quadro Kanban na coluna "Backlog", onde é priorizada pelo Product Owner.
3.  **Movimentação no Kanban:** Conforme a *issue* avança no ciclo de desenvolvimento, ela é movida pelas colunas do quadro (ex: "To Do", "In Progress", "In Review", "Done").
4.  **Desenvolvimento e Vinculação:** O desenvolvedor responsável cria uma branch a partir da *issue*. Ao abrir um Pull Request, ele é automaticamente vinculado à *issue*, mantendo o progresso sincronizado.
5.  **Fechamento Automático:** Quando o Pull Request é aprovado e "mergeado", a *issue* correspondente é fechada e movida para a coluna "Done" no quadro, garantindo que o status do projeto esteja sempre atualizado.


## Gerenciamento de Projeto
### Principal Ponto de Contato
- **Lucas** → Validação técnica da API  
- **Representante do Marketing** → Validação de UX/UI e campanhas
- **Frequência de atualização:** Reuniões semanais de alinhamento para acompanhamento do desenvolvimento e resolução de bloqueios.

---
### Divisão de Papéis

A equipe adota metodologias ágeis, utilizando o **Scrum** como base para o processo de desenvolvimento.  

- **Scrum Master:** Nitai Nandi *(sujeito a mudança)* 
- **Product Owner:** Lucas de Paula  
- **Equipe de Desenvolvimento:** Gabriela Cristina, Lucas de Paula, Mariana Martins, Nitai Nandi, Pedro Henrique, Robson Marcolino  
- **Equipe de Design:** Mariana Martins  

---

###  Stakeholders (Partes Interessadas)

- **Diretoria** → Interessada no crescimento da base de usuários e no volume de saques.  
- **Jurídico** → Responsável pela validação dos termos de uso, da política de privacidade e da conformidade com as regras do FGTS.  
- **Equipe de Atendimento** → Impactada pela mudança de fluxo; precisará ser treinada para lidar apenas com casos complexos encaminhados via chat.  

---
### Processo

Coloque  informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links Úteis**:
> - [Planejamento e Gestáo Ágil de Projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Sobre quadros de projeto](https://docs.github.com/pt/github/managing-your-work-on-github/about-project-boards)
> - [Como criar Backlogs no Github](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial Slack](https://slack.com/intl/en-br/)

### Ferramentas

As ferramentas empregadas no projeto são:

- Editor de código.
- Ferramentas de comunicação
- Ferramentas de desenho de tela (_wireframing_)

O editor de código foi escolhido porque ele possui uma integração com o sistema de versão. As ferramentas de comunicação utilizadas possuem integração semelhante e por isso foram selecionadas. Por fim, para criar diagramas utilizamos essa ferramenta por melhor captar as necessidades da nossa solução.

Liste quais ferramentas foram empregadas no desenvolvimento do projeto, justificando a escolha delas, sempre que possível.
 
> **Possíveis Ferramentas que auxiliarão no gerenciamento**: 
> - [Slack](https://slack.com/)
> - [Github](https://github.com/)
