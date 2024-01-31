<p align='center'><img width='400' src="./.github/logo.svg"/></p>

 <p align='center'>

<img src="https://img.shields.io/github/repo-size/Savio-Anjos/API-FindAFriend?color=1890FF">
<img src="https://img.shields.io/github/languages/count/Savio-Anjos/API-FindAFriend?color=1890FF">
<img src="https://img.shields.io/github/last-commit/Savio-Anjos/API-FindAFriend?color=1890FF">  
</p>

## 🚀 Tecnologias

Esse projeto está utilizando as seguintes tecnologias:

- [Node](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io//)

## 📜 Descrição

Esse projeto consiste em uma API para uma aplicação de adoção de animais,
nele foi utilizado padrões de arquitetura de software e foram desenvolvidos
testes unitários e E2E. Para garantir a qualidade foi configurado o ambiente
CI com github actions.

## ⚙️ Como funciona?

## RFs (Requisitos funcionais)

- [x] É possível cadastrar um pet
- [x] É possível listar todos os pets disponíveis para adoção em uma cidade
- [x] É possível filtrar pets por suas características
- [x] É possível visualizar detalhes de um pet para adoção
- [x] É possível deletar um pet
- [x] É possível se cadastrar
- [x] É possível realizar login
- [x] É possível realizar login com github
- [x] É possível se cadastrar como uma ORG
- [x] É possível realizar login como uma ORG

## RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] Todos os filtros, além da cidade, são opcionais

## Rotas da aplicação

A seguir estão as principais rotas da aplicação:

### Usuários

- **POST** `/users`: Cria um novo usuário.
- **POST** `/users/sessions`: Autentica um usuário.

### Organizações

- **POST** `/organizations`: Cria uma nova organização.
- **POST** `/organizations/sessions`: Autentica uma organização.

### Pets

- **POST** `/pets/:organizationId`: Cria um novo pet para uma organização específica.
- **DELETE** `/pets/:id`: Deleta um pet.
- **GET** `/pets/city/:city`: Lista todos os pets em uma determinada cidade.
- **GET** `/pets/filter`: Filtra pets com base em critérios específicos.
- **GET** `/pets/details/:id`: Obtém detalhes de um pet específico.

## 🎲 Quer customizar o projeto?

### Clone esse repositório

```bash
git clone https://github.com/Savio-Anjos/API-FindAFriend.git
```

### Navegue até o diretório do projeto

```bash
cd FindAFriend
```

### Instale as dependências

```bash
npm i
```

```bash
yarn
```

### Execute o docker compose

```bash
docker compose up
```

### Execute o docker

```bash
docker start
```

### Rode as migrations

```bash
npx prisma migrate dev
```

### Inicie a aplicação

```bash
npm run start:dev
```

---

<p>Criado com 💙 por <a href='https://github.com/Savio-Anjos/' target='_blank'>Sávio Anjos</a></p>
