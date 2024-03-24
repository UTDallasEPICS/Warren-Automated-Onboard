import * as React from 'react';
import Button from '../Button';
import DeleteIcon from '../../icons/DeleteIcon';

const EmployeeDeleteTask = (selectedTaskIDs) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tasksOptions, setTasksOptions] = React.useState([]);
  
  React.useEffect(() => {
    axios
      .delete(`http://localhost:5010/task/delete-user-task/${selectedTaskIDs.selectedTaskIDs}`)



  return (
    <Button color="red" extraStyling="py-3 px-4 mb-1">
      <DeleteIcon />
    </Button>
  );
}

export default EmployeeDeleteTask;