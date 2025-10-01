# gRPC User API

Este é um projeto de exemplo de uma API gRPC para gerenciamento de usuários, implementado em TypeScript.

## Tecnologias Utilizadas

*   [gRPC](https://grpc.io/)
*   [Protocol Buffers](https://developers.google.com/protocol-buffers)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Node.js](https://nodejs.org/)

## Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  Instale as dependências:

    ```bash
    yarn install
    ```

## Build

Para compilar os arquivos `.proto` do Protocol Buffers, execute o seguinte comando:

```bash
yarn build
```

Este comando irá gerar os arquivos `users_pb.js`, `users_pb.d.ts`, `users_grpc_pb.js`, e `users_grpc_pb.d.ts` no diretório `proto`.

## Uso

### Servidor

Para iniciar o servidor gRPC, execute o seguinte comando:

```bash
yarn server
```

O servidor estará rodando na porta `50051`.

### Cliente

O cliente pode ser usado para interagir com o servidor. Existem três scripts disponíveis:

*   **`yarn client`**: O script `client/index.ts` é o ponto de entrada principal para as operações do cliente. Por padrão, ele busca todos os usuários e depois cria novos usuários.
*   **`ts-node client/create-users.ts`**: Cria novos usuários a partir de um stream.
*   **`ts-node client/all-users.ts`**: Lista todos os usuários.
*   **`ts-node client/get-user.ts`**: Busca um usuário por ID.

## Serviços gRPC

A API gRPC expõe os seguintes serviços:

### `GetUser`

Busca um usuário por ID.

*   **Requisição**: `UserRequest`
    *   `id` (int32): O ID do usuário.
*   **Resposta**: `User`
    *   `id` (int32): O ID do usuário.
    *   `name` (string): O nome do usuário.
    *   `age` (int32): A idade do usuário.
    *   `status` (UserStatus): O status do usuário (`OFFLINE`, `BUSY`, `AVAILABLE`).

### `CreateUser`

Cria novos usuários a partir de um stream.

*   **Requisição**: `stream User`
*   **Resposta**: `google.protobuf.Empty`

### `GetUsers`

Retorna um stream de todos os usuários.

*   **Requisição**: `google.protobuf.Empty`
*   **Resposta**: `stream User`
