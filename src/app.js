const express = require("express")
const pool = require('./db.js') 

const app = express()

const port = process.env.PORT ||3000

app.listen(port)

app.get('/', (req, res) => {
    res.send('hola s')
})

app.get('/ping', async(req, res) => {
    const resp =  await pool.query('SELECT * FROM task')
    res.json(resp.rows)
})

app.use((err,req,res,next) => {
    return res.json({
        message:err.message
    })
})

console.log('Server on port ', port)