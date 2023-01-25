# My API Express

## Executar

1. `npm install` instale as dependências do projeto
2. `mv sample.env .env` preencha as variáveis de ambiente
3. `npm run dev` inicie o servidor

## Debug

No VSCode use a tecla `F5` ou clique em "Executar e Depurar" na aba lateral esquerda. Em seguida, clique na seta verde ("Iniciar a Depuração")

## Tópicos

- [x] API Restful NodeJS com ExpressJS e TypeScript
- [x] [TypeORM](https://typeorm.io/) para bancos de dados relacional
- [x] Documentação da API Restful com o Swagger ([Open API](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md))
- [x] IoC e injeção de dependências com a lib [tsyringe](https://github.com/Microsoft/tsyringe#readme) da Microsoft. [Artigo](https://dev.to/logrocket/top-5-typescript-dependency-injection-containers-53e2) sobre o uso de containers de injeção de dependências
- [x] Upload local de imagens com [Multer](https://github.com/expressjs/multer/blob/master/doc/README-pt-br.md)
- [ ] Autenticação com token de acesso Json Web Token (JWT) e Refresh Token

### Extra

- [x] Validação dos dados recebidos pela API usando o [Ajv JSON schema validator](https://ajv.js.org/)
- [x] Middleware de tratamento de erros personalizado
- [x] Seeds para popular uma tabela do banco de dados utilizando o módulo [typeorm-extension](https://typeorm-extension.tada5hi.net/guide/seeding.html), recomendado pelo [TypeORM](https://typeorm.io/#extensions)
- [ ] Testes unitários e end-to-end na aplicação
- [ ] Salvar avatar no Simple Storage Service (S3) da AWS
- [ ] i18n para tradução de mensagens de erro

## Anotações

### TypeORM CLI

~~~bash
# cria uma migration
npm run typeorm migration:create src/shared/typeorm/migrations/CreateRolesTable

# executa uma migration
npm run typeorm migration:run

# mostra todas as migrations e se elas foram executadas ou não
npm run typeorm migration:show

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

### Exemplo para documentações Swagger

- [Swagger Editor](https://editor.swagger.io)

### Módulo helper de Criptografia

- Especificação AES (Advanced Encryption Standard)
  - Pode utilizar uma ou duas chaves de encriptação
- Módulo ECB (Electronic Code Book), para utilizar apenas uma chave
- `openssl list-cipher-algorithms` - esse comando pode ser executado em sistemas baseados em Unix para verificar os tipos de algorítimos de criptografia disponíveis. `openssl list-cipher-algorithms | grep "AES-256-ECB"`
- [Ferramenta para testar Criptografia](https://www.devglan.com/online-tools/aes-encryption-decryption)
- [Referência](https://youtu.be/NiMlyJhlbeg)

### Gerador de keys

No [REPL](https://nodejs.org/api/repl.html#repl), ou console do Node, é possível utilizar o módulo `crypto` para gerar chaves aleatórias. Exemplo de uso: popular os campos que precisam de chaves no arquivo `.env`

- `node` entre no console do Node
- `crypto.randomBytes(16).toString('hex')` crie uma chave aleatória mudando a quantidade de bytes de tamanho. Uma observação, o tamanho da chave sempre será o dobro do valor passado no parâmetro de `randomBytes`, isso acontece por da conversão que é feita em seguida pelo `toString`, para a base 16. Para resolver esse problema basta construir o gerador nesse formato `crypto.randomBytes(Math.ceil(16)).toString('hex').slice(0, 16)`
