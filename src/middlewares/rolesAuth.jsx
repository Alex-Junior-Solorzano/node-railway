const { verifyToken } = require('../helpers/token.jsx')
const pool = require('../db.js')


const chechRolAuth = (roles) => async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await pool.query('SELECT * FROM usuario WHERE id = $1', [tokenData._id]);
        const user = await userData.rows[0]

        if ([].concat(roles).includes(user.rol)) {
            next()
        }else{
            res.status(409)
            res.send({ error: 'No tienes permisos ' })
        }
    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }
}

module.exports = chechRolAuth