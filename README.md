# app-my-api

## Tópicos

- [ ] Entender o que é, e como funciona uma API Restful
- [ ] Construir API Restful Javascript NodeJS com ExpressJS e Typescript
- [ ] Implementar o TypeORM em projetos NodeJS com bancos de dados relacionais
- [ ] Documentar API Restful com o Swagger (Open API)
- [ ] Implementar autenticação com token de acesso e refresh token (JWT)

## Anotações

### TypeORM CLI

~~~bash
# samples

# create an migration
npm run typeorm migration:create src/shared/typeorm/migrations/CreateRolesTable

# execute an migration
npm run typeorm -- -d src/shared/typeorm/index.ts migration:run
~~~

