const mongoose = require("mongoose") ;
const Joi = require("joi")

mongoose.connect("mongodb://localhost:27017/taskmanager")
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Connection error', err));

const taskSchema = new mongoose.Schema({
    "title": { type: String, maxlength: 100  },
    "description": { type: String },
    "status": { 
      type: String, 
      enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'], 
      default: 'TODO' 
    },
    "priority": { 
      type: String, 
      enum: ['LOW', 'MEDIUM', 'HIGH'], 
      default: 'LOW' 
    },
    "dueDate": { type: Date },
    "createdAt": { type: Date, default: Date.now }, 
    "updatedAt": { type: Date, default: Date.now },
  });

module.exports = mongoose.model("taskdb" , taskSchema)