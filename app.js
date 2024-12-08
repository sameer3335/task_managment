const express = require("express");

const mongoose = require('mongoose');
const app =  express();
const taskSchema = require("./models/taskdb")



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/tasks", async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        // Validating
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        // Creating
        const createTask = await taskSchema.create({
            title,
            description,
            status: status || "TODO", 
            priority: priority || "LOW", 
            dueDate,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json(createTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task" });
    }
});


app.get("/tasks", async (req, res) => {
    try {
    
      const { status, priority, sort, limit, skip } = req.query;
  
     
      const filter = {};
      if (status) filter.status = status; 
      if (priority) filter.priority = priority; 
  
      
      let sortOptions = {};
      if (sort) {
        const [key, order] = sort.split(":"); 
        sortOptions[key] = order === "desc" ? -1 : 1;
      }
  
      
      const limitValue = parseInt(limit) || 10; 
      const skipValue = parseInt(skip) || 0; 
  
      // finding
      const tasks = await taskSchema.find(filter)
        .sort(sortOptions) // Apply sorting
        .limit(limitValue) // Apply limit
        .skip(skipValue); // pagination
  
      // response
      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  });

  app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await taskSchema.findById(id);
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json(task);
    } catch (err) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
  });

  app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
  
    i//id check
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
  
    try {
      const updatedTask = await taskSchema.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status || "TODO",
          priority: req.body.priority || "LOW",
          dueDate: req.body.dueDate,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json(updatedTask);
    } catch (err) {
      console.error(err); 
      res.status(500).json({ error: "Server error during update" });
    }
  });
  


  app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params; 
  
    try {
      const task = await taskSchema.findByIdAndDelete(id); 
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json({
        message: "Task successfully deleted",
        task,
      });
    } catch (err) {
      res.status(400).json({ error: "Invalid task ID" });
    }
  });
  
  
  


app.listen(3000)