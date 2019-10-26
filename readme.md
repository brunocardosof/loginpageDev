![](gif.gif)<br/><br/>

# Especificações do Projeto:<br />
Backend: node.js - Express - Sequelize ORM<br />

Frontend: Angular 8.0 - Angular Material<br />

Banco de Dados: postgreSQL<br />

# Instalações: <br />
Nodejs<br />
https://nodejs.org/en/<br />

Angular CLI<br />
https://cli.angular.io/<br />

postgreSQL<br />
https://www.postgresql.org/<br />

# Criar o banco de dados no postgreSQL <br />
CREATE DATABASE loginpage;<br />
Modificar as configurações do banco de dados no backend src/config/database.js<br />

# Dentro da pasta Frontend:<br />
Instalar Dependencias<br />
npm install<br />

Iniciar o frontend em desenvolvimento<br />
ng serve -o<br />

# Dentro da pasta Backend <br />
Instalar Dependencias<br />
npm install<br />

Executar migrations<br />
npx sequelize db:migrate<br />

Executar seeders - Adicionar usuario padrão<br />
npx sequelize db:seed:all<br />

Iniciar o backend em desenvolvimento<br />
npm run dev<br />

# Usuário Padrão <br />
Email: admin@admin.com.br<br />
Senha: 123123<br />

# Mais informações <br />
https://trello.com/b/tvFPs6hk/login-page
