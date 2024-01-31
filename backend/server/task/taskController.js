// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    // Create a new task
    addTask: async(req, res) => {
        const { desc } = req.body;
        try{
            const task = await prisma.task.create({
                data: {
                    description: desc,
                    archived: false,
                },
            });
            res.status(201).json({ message: 'Task added successfully' });
        }
        catch(error){
            console.log(error);
            res.status(500).json({ message: 'Error adding task' });
        }
        
    },

    getTaskByID: async(req, res) => {
        const {id} = req.params;
        try {
            const task = await prisma.task.findUnique({
              where: {
                archived: false,
                id: parseInt(id),
              },
            });
            
            if (!task) {
              return res.status(404).json({ message: 'Task not found or is archived' });
            }
            return res.status(200).json(task)
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving task' });
        }
    },

    getAllTasks: async(req, res) => {
        try {
            const tasks = await prisma.task.findMany({
              where: {
                archived: false,
              },
            });
      
            if (!tasks) {
              return res
                .status(404).json({ message: 'No tasks found' });
            }
            res.status(200).json(tasks);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving all tasks' });
        }
    },

    deleteTask: async(req, res) => {
        const { id } = req.params;
        try {
            const deletedTask = await prisma.task.update({
                where: {
                id: parseInt(id),
              },
            data: {
                archived: true,
              },
            });
            
            if (!deletedTask) {
              return res.status(404).json({ message: 'Task not found or is archived' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error deleting task' });
        }
    }
};
