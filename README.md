# Node & Express Template
npm install: prisma, @prisma/client @quixo3/prisma-session-store bcryptjs body-parser cors dotenv
ejs express express-session express-validator jsonwebtoken passport passport-jwt passport-local pg
supertest --save-dev

run app
1)create .env with database url
2) npx prisma migrate dev --name init
3) node --watch app.js

psql
CREATE DATABASE name;
\l
\c dbname

