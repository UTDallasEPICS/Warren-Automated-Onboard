const controller = require('./departmentsController');

const addRoutes = (router) => {
  router.get('/getAllDepartments', controller.getAllDepartments);
  router.get('/getDepartment/:id', controller.getDepartment);
  router.post('/getDepartmentEmployeesNumber', controller.getDepartmentEmployeesNumber);
  router.patch('/updateDepartmentName', controller.updateDepartmentName);
  router.post('/addDepartment', controller.addDepartment);
  router.patch('/archiveDepartments', controller.archiveDepartments);
  router.patch('/deleteDepartments', controller.deleteDepartments);
};

module.exports = {
  addRoutes,
};
