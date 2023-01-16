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

- [x] Validação dos dados recebidos pela API usando o [Ajv JSON schema validator](https://ajv.js.org/)
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

### Padrões Regex

- [UUID v4](https://ihateregex.io/expr/uuid/)

### Exemplo para documentações Swagger

- [Swagger Editor](https://editor.swagger.io)

### Módulo helper de Criptografia

- Especificação AES (Advanced Encryption Standard)
  - Pode utilizar uma ou duas chaves de encriptação
- Módulo ECB (Electronic Code Book), para utilizar apenas uma chave
- `openssl list-cipher-algorithms` - esse comando pode ser executado em sistemas baseados em Unix para verificar os tipos de algorítimos de criptografia disponíveis. `openssl list-cipher-algorithms | grep "AES-256-ECB"`
- [Ferramenta para testar Criptografia](https://www.devglan.com/online-tools/aes-encryption-decryption)
- [Referência](https://youtu.be/NiMlyJhlbeg)
