module.exports = {
    db:{
        conect:process.env.DB_URL,
        user: process.env.DB_USER || 'postgres',
        pass: process.env.DB_PASSWORD || '123456',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ||5432,
        database: process.env.DB_NAME || 'tareadb'
    }
}