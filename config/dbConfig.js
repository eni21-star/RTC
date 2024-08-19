const {Client} = require('pg')
const pool = new Client ({
    user: 'postgres',
    password: '1234',
    port: '5432',
    host: 'localhost',
    database: 'postgres'
})

module.exports = pool