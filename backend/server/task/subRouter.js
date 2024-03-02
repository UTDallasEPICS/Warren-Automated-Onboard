const controller = require('./taskController');

const addRoutes = router => {
  //POST
  router.post('/task/new-task-department', controller.addTaskForDepartment);
  router.post('/task/new-task-user', controller.addTaskForUser);

  //GET
  router.get('/tasks/user-employee/:id', controller.getTasksForUserEmployeeId);
  router.get('/tasks/user-supervisor/:id', controller.getTasksForUserSupervisorId);
  router.get('/tasks/department/:id', controller.getTasksForDepartmentId);

  //PUT
  router.put('/task/update-employee-task/:id', controller.updateEmployeeTask);
  router.put('/task/update-department-task/:id', controller.updateDepartmentTask);

  //DELETE
  router.delete('/task/delete-user-task/:id', controller.deleteUserTask);
  router.delete('/task/delete-department-task/:id', controller.deleteDepartmentTask);
};

module.exports = {
  addRoutes,
};
