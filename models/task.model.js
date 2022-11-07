const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    day: { type: Number, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Task', taskSchema);