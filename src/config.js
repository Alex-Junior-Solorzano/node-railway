
module.exports = { user: process.env.DB_USER || 'postgres' }
module.exports = { pass: process.env.DB_PASSWORD || '123456' }
module.exports = { host: process.env.DB_HOST || 'localhost' }
module.exports = { port: process.env.DB_PORT ||5432 }
module.exports = { database: process.env.DB_NAME || 'tareadb' }
