## Description

Aplicação OpenSource para aprendizagem

## Environment

```bash
DATABASE_URL # utilizado o MongoDB com mongooose
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Stay in touch

-   Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
-   Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).

---

## Informações extra

-   O tratamento de erro ocorre em dois casos

```bash
Quando enviado um socket.emit (client) o sistema pode retornar um callback contendo a resposta de sucess ou error
{
    data: <T>,
    erro?: {
        codigo: string,
        mensagem: string
        detalhe?: string
    }
}
```

```bash
Erros que podem ser retornados de forma global (validações, autenticação, etc) são retornados ao ouvite "exception"
{
  status: string,
  message: string[] or string # em formato de string, geralmente é devido a validações do ValidationPipe
}
```

```bash
Os códigos de erros não seguem os padrões HTTP
```
