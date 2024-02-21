const controller = require('./taskController');
const addRoutes = (router) => {
    router.post('/task', controller.addTask);
    router.get('/tasks/:id', controller.getUsersTasks);
    router.get('/task/:id', controller.getTaskByID);
    router.get('/tasks', controller.getAllTasks);
    router.delete('/task/:id', controller.deleteTask);
    router.get('/department/:dept/tasks', controller.getDepartmentTasks);
    router.get('/department/tasks', controller.getAllDepartmentTasks);

   // router.get('/departments/tasks', controller.getAllDepartmentsTasks)
   // router.get('/department/tasks', controller.getAllDepartmentTasks)
   // router.get('/users/tasks', controller.getAllUsersTasks)
   // router.get('/user/tasks', controller.getAllUserTasks)
}
module.exports = {
    addRoutes,
  };