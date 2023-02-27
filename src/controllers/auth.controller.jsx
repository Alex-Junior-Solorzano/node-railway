const pool = require('../db.js')

const { encrypt, compare } = require('../helpers/encriptador.jsx')

const { tokenSing, decodeSing, verifyToken } = require('../helpers/token.jsx')

const login = async (req,res,next) => {
    try {
        const { nombre, contraseña} = req.body
        const data = await pool.query('SELECT * FROM usuario WHERE nombre = $1', [nombre]);
        //const user = await data.json();
        //const user = res.json(data.rows[0]);
        const user = await data.rows[0]
        //console.log(user)
        if(data.rows.length === 0){
            //res.status(404)
            res.send({error:'Usuario no encontrado'})
        }
        const checkContraseña = await compare (contraseña, user.contraseña)
        const tokenSession = await tokenSing(user)
        //console.log(user)
        if (!checkContraseña) {
            //res.status(404)
            res.send({error:'Contraseña incorrecta'})
            return
        }
        if (checkContraseña){
            //res.json(data);
            res.send({
                data: user,
                tokenSession
            })
           // res.json(data.rows[0]);
            return
        }

    } catch (error) {
        next(error);
    }
}

const registro = async (req,res,next) => {
    try {
        const { nombre, contraseña, rol, email } = req.body ;
        const contraseñaHash = await encrypt(contraseña)
        const result = await pool.query(
            'INSERT INTO usuario(nombre,contraseña,rol,email) VALUES ($1,$2,$3,$4) RETURNING *',
            [nombre,contraseñaHash,rol,email]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    registro
}