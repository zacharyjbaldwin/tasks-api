const Task = require('../models/task.model');

module.exports.getTasks = (req, res) => {
    if (req.query.day == undefined) {
        return res.status(400).json({
            error: 'Bad request: missing at least required query parameter.'
        });
    }

    Task.find({day: req.query.day})
        .then((tasks) => {
            res.status(200).json({
                message: 'Retrieved tasks.',
                count: tasks.length,
                tasks: tasks
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Failed to get tasks.'
            });
        });
};

module.exports.createTask = (req, res) => {
    if (req.body.day == undefined || req.body.description == undefined) {
        return res.status(400).json({
            error: 'Bad request: missing at least required parameter.'
        });
    }
    
    const task = new Task({
        day: req.body.day,
        description: req.body.description,
        completed: false
    });

    task.save()
        .then((task) => {
            res.status(201).json({
                message: `Created new task with ID ${task._id}`,
                task: task
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Failed to create task.'
            });
        });
};

module.exports.deleteTask = (req, res) => {
    Task.findOneAndDelete({_id: req.params.taskId})
        .then((response) => {
            res.status(204).json({
                message: `Deleted task with ID ${req.params.taskId}`
            })
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Failed to delete task.'
            });
        });
};

module.exports.updateTaskStatus = (req, res) => {
    if (req.body.completed == undefined) {
        return res.status(400).json({
            error: 'Bad request: missing at least required body parameter.'
        });
    }

    Task.findByIdAndUpdate(req.params.taskId, { completed: req.body.completed }, { new: true })
        .then((task) => {
            res.status(200).json({
                message: 'Updated task status.',
                task: task
            })
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Failed to udpate task status.'
            });
        });
};