const { Router } = require('express')

const {
    login,
    registro
} = require('../controllers/auth.controller.jsx')


const router = Router();

router.post('/loginn',login)
router.post('/registro',registro)

module.exports = router;