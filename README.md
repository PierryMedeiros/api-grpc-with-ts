# gRPC User API

Este é um projeto de exemplo de uma API gRPC para gerenciamento de usuários, implementado em TypeScript. O projeto foi aprimorado para incluir um banco de dados real com Prisma, uma CLI para o cliente e ferramentas de qualidade de código como ESLint e Prettier.

## Tecnologias Utilizadas

*   [gRPC](https://grpc.io/)
*   [Protocol Buffers](https://developers.google.com/protocol-buffers)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Node.js](https://nodejs.org/)
*   [Prisma](https://www.prisma.io/)
*   [SQLite](https://www.sqlite.org/index.html)
*   [ESLint](https://eslint.org/)
*   [Prettier](https://prettier.io/)
*   [Commander](https://github.com/tj/commander.js)

## Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  Crie um arquivo `.env` a partir do exemplo:

    ```bash
    cp .env.example .env
    ```

3.  Instale as dependências:

    ```bash
    yarn install
    ```

## Build

Para compilar os arquivos `.proto` do Protocol Buffers, execute o seguinte comando:

```bash
yarn build
```

Este comando irá gerar os arquivos `users_pb.js`, `users_pb.d.ts`, `users_grpc_pb.js`, e `users_grpc_pb.d.ts` no diretório `proto`.

## Migrations

Para executar as migrações do banco de dados com o Prisma, execute o seguinte comando:

```bash
npx prisma migrate dev
```

## Uso

### Servidor

Para iniciar o servidor gRPC, execute o seguinte comando:

```bash
yarn server
```

O servidor estará rodando na porta `3000`.

### Cliente (CLI)

O cliente é uma CLI que pode ser usada para interagir com o servidor. Para ver a lista de comandos, execute:

```bash
yarn client --help
```

**Comandos disponíveis:**

*   `get <id>`: Busca um usuário por ID.
*   `list`: Lista todos os usuários.
*   `create <name> <age> <status>`: Cria um novo usuário. O status pode ser `OFFLINE`, `BUSY` ou `AVAILABLE`.
*   `update <id> <name> <age> <status>`: Atualiza um usuário existente.
*   `delete <id>`: Deleta um usuário por ID.

**Exemplos:**

```bash
# Criar um usuário
yarn client create "John Doe" 30 AVAILABLE

# Listar todos os usuários
yarn client list

# Buscar o usuário com ID 1
yarn client get 1

# Atualizar o usuário com ID 1
yarn client update 1 "John Doe Jr." 31 BUSY

# Deletar o usuário com ID 1
yarn client delete 1
```

## Lint e Formatação

Para verificar o código com o ESLint, execute:

```bash
yarn lint
```

Para formatar o código com o Prettier, execute:

```bash
yarn format
```

## Serviços gRPC

A API gRPC expõe os seguintes serviços:

### `GetUser`

Busca um usuário por ID.

*   **Requisição**: `UserRequest`
*   **Resposta**: `User`

### `GetUsers`

Retorna um stream de todos os usuários.

*   **Requisição**: `google.protobuf.Empty`
*   **Resposta**: `stream User`

### `CreateUser`

Cria um novo usuário.

*   **Requisição**: `User`
*   **Resposta**: `User`

### `UpdateUser`

Atualiza um usuário existente.

*   **Requisição**: `User`
*   **Resposta**: `User`

### `DeleteUser`

Deleta um usuário por ID.

*   **Requisição**: `UserRequest`
*   **Resposta**: `google.protobuf.Empty`