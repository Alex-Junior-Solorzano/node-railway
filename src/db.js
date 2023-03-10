const { Pool } = require('pg')
const  { db }  = require('./config.js')

const pool = new Pool({
    connectionString:db.conect,
    user: db.user,
    password: db.pass,
    host: db.host,
    port: db.port,
    database: db.database
})

module.exports = pool;