# app-my-api

## Executar

1. `npm install`
2. `npm run dev`

## Debug

No VSCode use a tecla `F5` ou clique em "Executar e Depurar" na aba lateral esquerda. Em seguida clique na seta verde ("Iniciar a Depuração")

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

