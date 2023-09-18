# projeto-cypress-avancado
[![projeto-cypress-avancado](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/zew9s7/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/zew9s7/runs)
![cypress version](https://img.shields.io/badge/cypress-13.2.0-brightgreen)

Um projeto de estudos usando boas práticas de desenvolvimento de testes

# Pré-requisitos
Para começar é necessário instalar e garantir a compatibilidade entre as versões dos sistemas usados

- [Git](https://git-scm.com) (durante o desenvolvimento utilizei a versão 2.34.1)
- [Node](https://nodejs.org) (durante o desenvolvimento utilizei a versão 18.16.0)
- [Cypress](https://www.cypress.io/) (durante o desenvolvimento utilizei a versão 13.2.0)

**Obs.:** Para maior fidelidade nos resultados é recomendado utilizar as mesmas versões apresentadas

## Baixando o projeto
Com o navegador aberto, acesse a URL https://github.com/vitorrsbarbosa/projeto-cypress-avancado e clique no botão **Code** e copei o link apresentado, após isso abra o terminal de linha de comando na pasta onde deseja salvar o projeto e execute o seguinte comando `git clone [link-do-repositório]`

Abrindo a pasta do projeto irá se deparar com a seguinte organização de arquivos
```
.
├── cypress
│   ├── e2e
│   │   └── hackerStories.cy.js
│   ├── fixtures
│   │   ├── empty.json
│   │   └── stories.json
│   └── support
│       ├── commands.js
│       └── e2e.js
├── README.md
├── cypress.config.js
├── package-lock.json
└── package.json
```

## Instalação das dependências
As dependências do projeto já estão informadas no arquivo `package.json`, precisa apenas executar no terminal o comando `npm install` (ou `npm i`) na pasta raiz do projeto. Isso fará com que sejam instaladas as dependências listadas na versão informada

- `Cypress` é o framework de testes no qual foram criados os testes deste projeto
- `cypress-localstorage-commands` é um projeto para acessar o armazenamento do navegador durante os testes
- `faker` serve para geração de dados randômicos utilizados nos testes
- `standartjs` serve para definir um padrão na codificação do projeto

## Comandos úteis do projeto
- `test`: este comando executa todos os testes dentro do diretório **cypress/e2e/**
- `cy:open`: este comando abre o modo interativo do Cypress, apresentando os arquivos de teste, lista de execuções no Cypress Cloud, página de Debug e Configurações do projeto
- `lint`: este comando faz uma varredura no projeto por linhas de código fora do padrão definido
- `lint-fix`: este comando executa uma correção nas irregularidades encontradas pelo StandartJS

## Temas estudados no projeto

- Criação de testes flakiness-free
- Interação com a aplicação próxima a de um usuário real
  - Esperar um elemento estar visível antes de interagir com ele
  - Simular o uso do teclado para navegação no lugar do clique do mouse
  - Esperar requisições antes de realizar o teste
- Organização de testes de acordo com o contexto
- Ler informações do localStorage do navevgador
- Especificação de seletores de elementos mais específicos
- Simplificação de comandos repetitivos
- Interceptação de mock da API para independência dos testes de frontend
- Simulação de erros no servidor e rede
- Simulação de lentidão na chamada da API
- Modificação no relatório padrão de testes
