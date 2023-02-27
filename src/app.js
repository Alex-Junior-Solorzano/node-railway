const express = require("express")
const morgan = require('morgan');
const cors = require ('cors');

const taskRoutes = require('./routes/tasks.routes.jsx')
const usersRoutes = require('./routes/users.routes.jsx')
const authRoutes = require('./routes/auth.routes.jsx')

const pool = require('./db.js') 

const app = express()
const port = process.env.PORT ||3000 ;

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

app.use(taskRoutes)
app.use(usersRoutes)
app.use(authRoutes)

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