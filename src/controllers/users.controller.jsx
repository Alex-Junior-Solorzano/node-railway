const pool = require('../db.js')
const { encrypt, compare } = require('../helpers/encriptador.jsx')

const login = async (req,res,next) => {
    try {
        const { nombre } = req.params
        const user = await pool.query('SELECT * FROM usuario WHERE nombre = $1', [nombre]);
        if (user.rows.length === 0) 
            return res.status(404).json ({
                message: 'Usuario no encontrado'
        });
        res.json(user.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req,res,next) => {
    try {
        const { id } = req.params
        const user = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        if (user.rows.length === 0) 
            return res.status(404).json ({
                message: 'Usuario no encontrado'
        });
        res.json(user.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAlluser = async (req,res,next) => {
    try {
        //throw new Error ('Algo salio mal')
        const allUser = await pool.query('SELECT * FROM usuario');
        //console.log(allTask);
        res.json(allUser.rows);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req,res,next) => {
    const { nombre, contraseña, rol, email } = req.body ;
    
    try {
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

const deleteUser = async (req,res,next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
        if (result.rowCount === 0) 
            return res.status(404).json ({
                message: 'Usuario no encontrado',
        });
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
    
}

const updateUser = async (req,res,next) => {
    const { id } = req.params;
    const { nombre, contraseña, rol, email} = req.body;

    try {
        const contraseñaHash = await encrypt(contraseña)
        const result = await pool.query(
            'UPDATE usuario SET nombre= $1, contraseña= $2, rol= $3, email= $4 WHERE id = $5 RETURNING *', 
            [nombre, contraseñaHash, rol, email,id]
        );
        if (result.rows.length === 0) 
            return res.status(404).json ({
                message: 'Usuario no encontrado'
        });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUser,
    getAlluser,
    createUser,
    deleteUser,
    updateUser
    //login
}