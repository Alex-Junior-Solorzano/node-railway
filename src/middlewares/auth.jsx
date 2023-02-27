const { verifyToken } = require('../helpers/token.jsx')

const checkAuth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        if (tokenData._id) {
            next()
        }else{
            res.status(409)
            res.send({ error: 'No tienes acceso ' })
        }
    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Por aqui no pasas!' })
    }
}

module.exports =  checkAuth 