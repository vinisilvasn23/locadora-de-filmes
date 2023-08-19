# Locadora de Filmes API

Este é um microsserviço destinado a gerenciar a coleção de filmes disponíveis em uma plataforma de streaming. A API permite a criação, listagem, busca, atualização e deleção de filmes.

## Configuração

Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.

1. Clone este repositório.
2. Instale as dependências usando o comando: `npm install`.
3. Configure seu banco de dados PostgreSQL e crie um novo banco de dados chamado `locadora_de_filmes`.
4. Execute o script SQL fornecido em `sql/create_table.sql` para criar a tabela `movies`.
5. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente do PostgreSQL.

## Endpoints

- **POST /movies**
  - Cria um novo filme.
  - Corpo da Requisição:
    ```json
    {
      "name": "Nome do Filme",
      "category": "Categoria",
      "duration": 120,
      "price": 35
    }
    ```
  - Resposta do Servidor:
    ```json
    {
      "id": 1,
      "name": "Nome do Filme",
      "category": "Categoria",
      "duration": 120,
      "price": 35
    }
    ```

- **GET /movies**
  - Lista todos os filmes ou filtra por categoria.
  - Parâmetros de Consulta:
    - `category` (opcional): Filtra por categoria.
  - Resposta do Servidor (exemplo):
    ```json
    [
      {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
      },
      {
        "id": 2,
        "name": "Matrix",
        "category": "Ficção",
        "duration": 120,
        "price": 35
      }
    ]
    ```

- **GET /movies/:id**
  - Busca um filme pelo id.
  - Resposta do Servidor (exemplo):
    ```json
    {
      "id": 1,
      "name": "Divertidamente",
      "category": "Animação",
      "duration": 120,
      "price": 35
    }
    ```

- **PATCH /movies/:id**
  - Atualiza um filme pelo id.
  - Corpo da Requisição (opcional):
    ```json
    {
      "name": "Novo Nome do Filme"
    }
    ```
  - Resposta do Servidor:
    ```json
    {
      "id": 1,
      "name": "Novo Nome do Filme",
      "category": "Animação",
      "duration": 120,
      "price": 35
    }
    ```

- **DELETE /movies/:id**
  - Deleta um filme pelo id.
  - Resposta do Servidor (status code):
    ```
    204 No Content
    ```

## Execução

1. Execute o comando `npm start` para iniciar o servidor.
2. Acesse os endpoints conforme descrito acima usando um cliente API, como o Insomnia ou Postman.

## Observações

- Certifique-se de seguir todas as regras e especificações descritas pelo cliente para garantir o correto funcionamento da API.
- O diagrama da tabela de banco de dados pode ser encontrado no arquivo `sql/diagram.png`.

Lembre-se de manter o código organizado e seguindo as melhores práticas de desenvolvimento. Boa codificação!
