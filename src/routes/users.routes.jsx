const { Router } = require('express')
const {
    getUser,
    getAlluser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/users.controller.jsx')

const checkAuth = require('../middlewares/auth.jsx')
const checkRolAuth = require('../middlewares/rolesAuth.jsx')

const router = Router();

router.get('/users/:id', getUser)

//router.get('/login', login)

//router.get('/users',checkAuth, checkRolAuth(['Admin']), getAlluser)
router.get('/users',checkAuth, checkRolAuth(['Admin']), getAlluser)

router.post('/users',createUser)

router.delete('/users/:id',deleteUser)

router.put('/users/:id',updateUser)

module.exports = router;