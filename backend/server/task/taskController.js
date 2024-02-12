// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    // Create a new task
    addTask: async(req, res) => {
        const desc = req.body.desc;
        const deptid = req.body.dept;
        if (deptid) { //if task is assigned to a department
          try{
            for(const num of deptid){
              const task = await prisma.task.create({
                data: {
                    description: desc,
                    archived: false,
                    DepartmentTaskMapping: {
                      create: [{
                        dueDate: new Date(),
                        department: {
                          connect:{
                            id : num,
                          }
                        }
                      }]
                    }
                },
              }); 
            }
            res.status(201).json({ message: 'Task added with department successfully' });
          }
          catch(error){
            console.log(error);
            res.status(500).json({ message: 'Error adding task with department' });
          }
        }
        
        else{ //task is not assigned to department
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
            res.status(500).json({ message: 'Error adding task ' });
          }
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
            res.status(500).json({ message: 'Error retrieving all tasks'});
        }
    },

    getDepartmentTasks: async(req, res) => {
      console.log("Getting the tasks" )
      const dept = parseInt(req.params.dept);
      const tasks = await prisma.task.findMany({
        where: {
          DepartmentTaskMapping: {
            some:{
              departmentId : dept,
            }
          }

        }
      })
      
      for(i in tasks){
        console.log(tasks[i])
      }
      return res.status(200).json(tasks)
    },

    getAllDepartmentTasks: async(req, res)  =>{
      console.log("All Department Tasks")
      try {
        const departments = await prisma.department.findMany({
          where: {
            archived: false,
          },
        });
        
        if(!departments){
          return res.status(404).json({message: 'No departments found'})
        }

        let depttasks = []
        
        for(const dept of departments){
            const taskDepartment = await prisma.departmentTaskMapping.findMany({
              where: {
                departmentId: dept.id,
              } 
            })
  
            tasks = await prisma.task.findMany({
              where: {
                DepartmentTaskMapping: {
                  some: {
                    department: {
                      id : dept.id,
                    }
                  }
                }
              }
            })
            depttasks.push({"dept" : dept.name, "tasks" : tasks})
          }  
        return res.status(200).json(depttasks)
      }
      catch (error){
        res.status(500).json({message : "Error finding departments"})
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
