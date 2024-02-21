// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = {
  addTask: async (req, res) => {
    const desc = req.body.desc;
    const deptid = req.body.dept;
    const supervisorid = req.body.supervisor;
    const userid = req.body.user;


    try {
      //Create the task
      const task = await prisma.task.create({
        data: {
          description: desc,
          archived: false,
        },
      });


      //Map the task to all departments
      if (deptid) {
        for (const num of deptid) {
          const taskDepMapping = await prisma.departmentTaskMapping.create({
            data: {
              taskId: task.id,
              departmentId: num,
              dueDate: new Date()
            }
          })
        }
      }


      //Maps the task to the supervisor
      const superTaskMapping = await prisma.approverTaskMapping.create({
        data: {
          userId: supervisorid,
          taskId: task.id
        }
      })


      //Maps the task to the employees
      const employeeTaskMapping = await prisma.onboardingEmployeeTaskMapping.create({
        data: {
          userId: userid,
          taskId: task.id
        }
      })

      res.status(201).json({ message: 'Task added successfully' });
    }
    catch (error) {
      res.status(500).json({ message: 'Error adding task' });
    }

  },


  getTaskByID: async (req, res) => {
    const { id } = req.params;
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
      res.status(500).json({ message: 'Error retrieving task' });
    }
  },


  getAllTasks: async (req, res) => {
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


  getDepartmentTasks: async (req, res) => {
    const dept = parseInt(req.params.dept);
    const tasks = await prisma.task.findMany({
      where: {
        DepartmentTaskMapping: {
          some: {
            departmentId: dept,
          }
        }
      }
    })
    return res.status(200).json(tasks)
  },


  getAllDepartmentTasks: async (req, res) => {
    console.log("All Department Tasks")
    try {
      const departments = await prisma.department.findMany({
        where: {
          archived: false,
        },
      });

      if (!departments) {
        return res.status(404).json({ message: 'No departments found' })
      }


      let depttasks = []

      for (const dept of departments) {
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
                  id: dept.id,
                }
              }
            }
          }
        })
        depttasks.push({ "dept": dept.name, "tasks": tasks })
      }
      return res.status(200).json(depttasks)
    }
    catch (error) {
      res.status(500).json({ message: "Error finding departments" })
    }
  },

  archiveTask: async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id)
    try {

      //Archive task
      const archivedTask = await prisma.task.update({
        where: {
          id: id,
        },
        data: {
          archived: true,
        },
      });

      if (!archivedTask) {
        return res.status(404).json({ message: 'Task not found or is archived' });
      }

      //Archive mappings in departmentTaskMapping
      const archiveTaskDepMap = await prisma.departmentTaskMapping.updateMany({
        where: {
          taskId: id
        },
        data: {
          archived: true
        }
      })

      //Archive mappings in approverTaskMapping
      const archiveApproverTaskMap = await prisma.approverTaskMapping.updateMany({
        where: {
          taskId: id
        },
        data: {
          archived: true
        }
      })

      //Archive mappings in onboardingEmployeeTaskMapping
      const archiveEmployTaskMap = await prisma.onboardingEmployeeTaskMapping.updateMany({
        where: {
          taskId: id
        },
        data: {
          archived: true
        }
      })

      res.status(200).json({ message: 'Task archived successfully' });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving task' });
    }
  }

};
