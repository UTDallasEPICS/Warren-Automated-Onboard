const controller = require('./taskController');
const addRoutes = (router) => {
    router.post('/task', controller.addTask);

    router.get('/task/:id', controller.getTaskByID);
    router.get('/tasks', controller.getAllTasks);
    router.put('/archivetask/:id', controller.archiveTask);
    router.get('/department/:dept/tasks', controller.getDepartmentTasks);
    router.get('/department/tasks', controller.getAllDepartmentTasks);

   //router.put('/updatetask/:id', controller.updateTask)
   // router.get('/departments/tasks', controller.getAllDepartmentsTasks)
   // router.get('/department/tasks', controller.getAllDepartmentTasks)
   // router.get('/users/tasks', controller.getAllUsersTasks)
   // router.get('/user/tasks', controller.getAllUserTasks)
}
module.exports = {
    addRoutes,
  };