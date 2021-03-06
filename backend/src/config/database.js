// Development DB
module.exports = {
    host: 'vps20407.publiccloud.com.br',
    username: 'postgres',
    port: 5433,
    password: 'loginpage',
    database: 'loginpage',
    dialect: 'postgres',
    logging: false,
    define: {
        timestaps: true,
        underscored: true, //Transforma formato camelCase in underline EX: userGroup = user_group
    },
}

// Production DB
// module.exports = {
//   host: '127.0.0.1',
//   username: 'postgres',
//   password: '6641481postgreSQL',
//   database: 'loginpage',
//   dialect: 'postgres',
//   logging: false,
//   define: {
//     timestaps: true,
//     underscored: true, //Transforma formato camelCase in underline EX: userGroup = user_group
//     underscordAll: true
//   },
// }