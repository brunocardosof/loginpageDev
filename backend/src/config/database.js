// Development DB
module.exports = {
    host: 'loginpage.cjn44icrwcna.us-east-1.rds.amazonaws.com',
    username: 'postgres',
    password: 'loginpage',
    database: 'loginpage',
    dialect: 'postgres',
    logging: false,
    define: {
        timestaps: true,
        underscored: true, //Transforma formato camelCase in underline EX: userGroup = user_group
        underscordAll: true
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