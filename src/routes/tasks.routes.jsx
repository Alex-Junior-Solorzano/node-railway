const { Router } = require('express')

const { getAllTask, 
    getTask, 
    createTask, 
    deleteTask, 
    updateTask,
} = require('../controllers/tasks.controller.jsx')

//const checkAuth = require('../middeleware/auth.jsx')
//const checkRolAuth = require('../middeleware/rolesAuth.jsx')

const router = Router();

router.get('/tasks', getAllTask)

router.post('/tasks',createTask)

router.delete('/tasks/:id',deleteTask)

router.put('/tasks/:id',updateTask)

router.get('/tasks/:id', getTask)

module.exports = router;