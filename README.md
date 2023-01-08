# app-my-api

## Executar

1. `npm install`
2. `npm run dev`

## Debug

No VSCode use a tecla `F5` ou clique em "Executar e Depurar" na aba lateral esquerda. Em seguida, clique na seta verde ("Iniciar a Depuração")

## Tópicos

- [x] Entender o que é, e como funciona uma API Restful
- [x] Construir API Restful Javascript NodeJS com ExpressJS e Typescript
- [x] Implementar o [TypeORM](https://typeorm.io/) em projetos NodeJS com bancos de dados relacionais
- [x] Documentar API Restful com o Swagger ([Open API](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md))
- [x] IoC e injeção de dependências com a lib [tsyringe](https://github.com/Microsoft/tsyringe#readme) da Microsoft. [Artigo](https://dev.to/logrocket/top-5-typescript-dependency-injection-containers-53e2) sobre o uso de containers de injeção de dependências
- [ ] Implementar autenticação com token de acesso e refresh token (JWT)

### Extra

- [x] Validação de dos dados recebidos pela API usando o [Ajv JSON schema validator](https://ajv.js.org/)
- [x] Middleware de tratamento de erros personalizado
- [ ] Adicionar testes unitários e end-to-end na aplicação

## Anotações

### TypeORM CLI

~~~bash
# samples

# create an migration
npm run typeorm migration:create src/shared/typeorm/migrations/CreateRolesTable

# execute an migration
npm run typeorm -- -d src/shared/typeorm/index.ts migration:run
~~~

### Regex pattern

- [UUID v4](https://ihateregex.io/expr/uuid/)

### Swagger example

- [Swagger Editor](https://editor.swagger.io)
