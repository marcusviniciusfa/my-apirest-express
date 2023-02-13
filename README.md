# My API Express

Exemplo de API utilizando o framework Express, construída com base no curso [Iniciando no desenvolvimento de API Node.js com Typescript](https://www.udemy.com/course/primeiros-passos-nodejs-typescript/) do professor [Jorge Aluizio](https://www.linkedin.com/in/jorgealuizio/)

## Executando

1. `npm install` instale as dependências do projeto

2. `mv sample.env .env` preencha as variáveis de ambiente

3. `npm run typeorm migration:run` execute as migrações do banco de dados

4. `npm run seeding` crie o [usuário admin](./src/users/database/seeding/UserSeeder.ts)

5. `npm run dev` inicie o servidor

6. faça o login com o usuário admin à partir de uma requisição na rota `/users/login`, enviando o email e o password do usuário admin. Você vai receber o token de acesso

~~~json
{
	"email": "user.admin@email.com",
	"password": "12345678"
}
~~~

7. agora, antes de fazer as demais requisições basta adicionar ao Header o campo `Authorization` com o valor `Bearer + expaço + token`

## Documentação da API

- `npm run dev` inicie o servidor
- http://localhost:3000/api/v1/docs acesse a documentação no browser

## Tópicos cobertos pelo curso

- [x] API Restful NodeJS com ExpressJS e TypeScript
- [x] [TypeORM](https://typeorm.io/) para bancos de dados relacional
- [x] Documentação da API Restful com o Swagger ([Open API](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md))
- [x] IoC e injeção de dependências com a lib [tsyringe](https://github.com/Microsoft/tsyringe#readme) da Microsoft. [Artigo](https://dev.to/logrocket/top-5-typescript-dependency-injection-containers-53e2) sobre o uso de containers de injeção de dependências
- [x] Upload local de imagens com [Multer](https://github.com/expressjs/multer/blob/master/doc/README-pt-br.md)
- [x] Autenticação com token de acesso Json Web Token (JWT) e Refresh Token

## Tópicos extras (complemento para o curso)

- [x] Validação dos dados recebidos pela API usando o [Ajv JSON schema validator](https://ajv.js.org/)
- [x] Middleware de tratamento de erros personalizado
- [x] Seeds para popular uma tabela do banco de dados utilizando o módulo [typeorm-extension](https://typeorm-extension.tada5hi.net/guide/seeding.html), recomendado pelo [TypeORM](https://typeorm.io/#extensions)
- [x] Implementação de access token e refresh token seguindo o artigo ["Usando Tokens JWT de forma Segura"](https://blog.lsantos.dev/jwt-seguro/), escrito por Lucas Santos
- [ ] Testes unitários e end-to-end com [Jest](https://jestjs.io/pt-BR/)
- [ ] Salvar avatar no [Simple Storage Service (S3) da AWS](https://aws.amazon.com/pt/s3/)
- [ ] Tradução de mensagens de erro com [i18n](https://www.i18next.com/)
- [ ] Rota com opção de documentação Swagger em `pt-br`

## Anotações

### TypeORM CLI

~~~bash
# cria uma migration
npm run typeorm migration:create src/shared/typeorm/migrations/CreateRolesTable

# executa as migrations
npm run typeorm migration:run

# mostra todas as migrations e se elas foram executadas ou não
npm run typeorm migration:show

# desfaz a última migration executada
npm run typeorm migration:revert

# exclui completamente os dados do banco de dados
npm run typeorm schema:drop
~~~

### typeorm-extension CLI

~~~bash
# popula a tabela de Roles com dados iniciais
npm run seeding
~~~

### Padrões Regex

- [UUID v4](https://ihateregex.io/expr/uuid/)
- [e-mail](https://ihateregex.io/expr/email/)

### Exemplo para documentações Swagger

- [Swagger Editor](https://editor.swagger.io)

### Módulo helper de Criptografia

- Especificação AES (Advanced Encryption Standard)
  - Pode utilizar uma ou duas chaves de encriptação
- Módulo ECB (Electronic Code Book), para utilizar apenas uma chave
- `openssl list-cipher-algorithms` - esse comando pode ser executado em sistemas baseados em Unix para verificar os tipos de algorítimos de criptografia disponíveis. `openssl list-cipher-algorithms | grep "AES-256-ECB"`
- [Ferramenta para testar Criptografia](https://www.devglan.com/online-tools/aes-encryption-decryption)
- [Material de referência](https://youtu.be/NiMlyJhlbeg)

### Gerador de keys

No [REPL](https://nodejs.org/api/repl.html#repl), ou console do Node, é possível utilizar o módulo `crypto` para gerar chaves aleatórias. Exemplo de uso: popular os campos que precisam de chaves no arquivo `.env`

- `node` entre no console do Node
- `crypto.randomBytes(16).toString('hex')` crie uma chave aleatória mudando a quantidade de bytes de tamanho. Uma observação: o tamanho da chave sempre será o dobro do valor passado no parâmetro de `randomBytes`, isso acontece por causa da conversão, para a base 16, que é feita em seguida pelo `toString`. Para resolver esse problema basta construir o gerador nesse formato `crypto.randomBytes(Math.ceil(16)).toString('hex').slice(0, 16)`
