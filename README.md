# 🐘 Market NextJS FastAPI

## Conteúdos:

🎯 Objetivo

🏃 Executando o projeto

📄 Scripts

🔍 Acessando o banco de dados

📚 Documentação de API

🧪 Testes unitários/funcionais

📂 Dados do PostgreSQL

🚧 Resolvendo problemas

---

## 🎯 Objetivo

O desafio consiste em criar uma aplicação simples de mercado com React no front-end, Python no backend e PostgreSQL como banco de dados.

Para mais detalhes, acesse a seção **📚 Documentação de API**.

## 🏃 Executando o projeto

**Recomendo fortemente** que você tenha um ambiente **Docker Desktop** com suporte ao **Compose V2** do [**plugin da linha de comando**](https://docs.docker.com/compose/install/) `docker compose`.

> ⚠️ Este projeto usa scripts em Bash para tornar alguns comandos mais fáceis de executar e os mesmos foram testados em uma máquina Linux. Se você está usando Windows, recomendo fortemente que você execute este projeto em uma distribuição no WSL2 ou use Git Bash como seu terminal.

Abra seu terminal na pasta raiz e digite:

```sh
./run.sh
```

Este script irá garantir que suas imagens sejam construídas, todas as dependências sejam instaladas e todas as migrações de banco de dados sejam realizadas na primeira execução. Nas próximas execuções, ele irá pular o passo de instalação e iniciar diretamente todos os contêineres.

Quando o front-end estiver disponível em `localhost:4000`, você estará pronto para utilizar o projeto por completo.

Para parar de executar os contêineres, execute

```sh
./stop.sh
```

e todos os contêineres serão removidos.

> ⚠️ Os volumes estão presos às pastas dos projetos, então deletar um contêiner não irá deletar seus dados!

## 📄 Scripts

Além de `run.sh` e `stop.sh`, temos alguns outros scripts auxiliares:

- `build.sh`: Reconstrói as imagens caso você tenha alterado alguma coisa nos Dockerfiles. Você precisará reiniciar os contêineres manualmente.
- `test.sh`: Executa testes unitários no front-end e no back-end.

## 🔍 Acessando o banco de dados

Você nao conseguirá acessar diretamente o banco de dados pois as portas estão protegidas (não expostas para a máquina host) para simular um ambiente de isolamento de rede. Para acessar o banco, disponibilizei uma interface de acesso pelo Adminer (essa imagem possui acesso interno ao banco):

- _Adminer_ disponível em `http://localhost:8080/`
  - Sistema: PostgreSQL
  - Servidor: `db-postgresql:5432`
  - Usuário: `user`
  - Senha: `pass`

Caso queira usar ferramentas externas (DBeaver por exemplo), descomente a seção `ports` do `docker-compose.dev.yml` no serviço `db-postgresql`.

## 📚 Documentação de API

Você pode entrar em `http://localhost:8080/docs` para acessar toda a documentação da API.

## 🧪 Testes unitários/funcionais

Todos os testes podem ser executados com o comando `./test.sh`

## 📂 Dados do PostgreSQL

Os dados das tabelas estão dentro de `postgres/data`. Caso queira limpar o banco completamente pelo sistema de arquivos, você terá apagar a pasta, tarefa que necessitará da permissão de super usuário.

## 🚧 Resolvendo problemas

- Garanta que você tem estas portas de rede disponíveis antes de executar o projeto
  - `4000`: Servidor de desenvolvimento do NextJS
  - `8000`: API
  - `8080`: Adminer
- Garanta que o serviço do Docker está rodando!
- Garanta que você está usando uma versão recente do Docker que tenha suporte ao [**plugin de linha de comando oficial do Docker Compose V2**](https://docs.docker.com/compose/install/). **Este projeto não usa o antigo `docker-compose`**. Este formato não será mais suportado a partir do final de Junho de 2023, de acordo com a documentação.
- Se você de alguma forma está recebendo erro de `Permissão negada` ao tentar executar qualquer script, execute
  ```sh
  chmod +x ./*.sh && chmod +x ./docker/*.sh
  ```
  para garantir que seu terminal consegue executar scripts utilitários e scripts de entrada de contêineres do docker.
