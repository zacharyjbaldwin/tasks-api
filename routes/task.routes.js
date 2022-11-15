const router = require('express').Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getTasks);

router.post('/', taskController.createTask)

router.delete('/day/:day', taskController.deleteTaskByDay);

router.delete('/:taskId', taskController.deleteTask);

router.put('/:taskId', taskController.updateTaskStatus);

module.exports = router;