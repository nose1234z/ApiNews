const Sequelize = require('sequelize')
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('../config.js')


const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true
        }
    }
})


connection.authenticate()
    .then(() => {
        console.log('Se ha establecido conexión con la base de datos')
    })
    .catch(err => {
        console.log('No se pudo establecer conexión con la base de datos', err)
    })


module.exports = { connection };