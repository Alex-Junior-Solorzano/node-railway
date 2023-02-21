const { Pool } = require('pg')
const { user, pass, port, host, database } = require('./config.js')

const pool = new Pool({
    user: user,
    password: pass,
    host: host,
    port: port,
    database: database
})

module.exports = pool;