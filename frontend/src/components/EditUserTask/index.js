import * as React from 'react';
import { Dialog } from '@headlessui/react';
import Button from '../Button';
import EditIcon from '../../icons/EditIcon';
import CrossIcon from '../../icons/CrossIcon';
import axios from 'axios';
import Select from 'react-select';
import Section from '../Section';

const EditUserTask = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState('');
  const [supervisors, setSupervisors] = React.useState([]);
  const [selectedSupervisors, setSelectedSupervisors] = React.useState([]);
  const [supervisorsOptions, setSupervisorsOptions] = React.useState([]);
  const [selectedEmployee, setSelectedEmployee] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    description: '',
    supervisors: [],
  });

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSupervisorChange = selectedOptions => {
    setFormData({
      ...formData,
      supervisors: selectedOptions,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTask(null);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:5010/tasks/user-employee/${selectedEmployee.id}`)
      .then(res => {
        setSelectedTask(
          res.data.map((task, index) => ({
            value: task.id || index,
            label: task.description,
          }))
        );
      })
      .catch(err => {
        console.log(err);
      });
      axios
      .get(`http://localhost:5010/users/supervisors`)
      .then(res => {
        setSupervisorsOptions(
          res.data.map((supervisor, index) => ({
            value: supervisor.id || index,
            label: supervisor.name,
          }))
        );
      })
      .catch(err => {
        console.log(err);
      });
    if (selectedTask) {
      setIsLoading(true);
      axios
        .get(`http://localhost:5010/task/${selectedTask.value}`)
        .then(res => {
          setFormData({
            description: res.data.description,
            supervisors: res.data.supervisor.map(name => ({
              label: name,
              value: supervisorsOptions.find(option => option.label === name).value,
            })),
          });
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [selectedTask]);

  const handleSelectChange = selectedOption => {
    setSelectedTask(selectedOption);
    console.log('Selected task ID:', selectedOption.value);
  };

  return (
    <>
      <Button color="green" extraStyling="py-3 px-3 mb-1" onClick={openModal}>
        <EditIcon />
      </Button>

      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <Button
              color="gray"
              extraStyling="absolute top-0 right-0 m-2"
              onClick={closeModal}
            >
              <CrossIcon />
            </Button>

            <Dialog.Title className="text-lg leading-6 font-medium text-gray-900 p-6">
              Edit Task
            </Dialog.Title>

            <div className="p-6">
              <Select
                options={tasks}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
              {selectedEmployee && (
                <Section>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const errors = {};

                      axios
                        .put(
                          `http://localhost:5010/user/task/update-employee-task/:id/${selectedTask.value}`,
                          {
                            description: formData.description,
                            supervisorId: selectedSupervisors.map(
                              supervisor => supervisor.value
                            ),
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${
                                JSON.parse(
                                  localStorage.getItem(localStorage.key(1))
                                ).id_token
                              }`,
                            },
                          }
                        )
                        .then(res => {
                          console.log(res);
                          window.location.reload();
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }}
                  >
                    <div className="flex flex-col">
                      <label>Description</label>
                      <input
                        className="h-9 rounded border-2 hover:border-blue-400"
                        placeholder="  Type..."
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {formErrors.name && (
                        <p style={{ color: 'red' }}>{formErrors.name}</p>
                      )}
                    </div>
                    
                    {/* <div className="flex flex-col">
                      <label>Supervisor</label>
                      <input
                        className="h-9 rounded border-2 hover:border-blue-400"
                        placeholder="  Type..."
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {formErrors.name && (
                        <p style={{ color: 'red' }}>{formErrors.name}</p>
                      )}
                    </div> */}

                    {console.log('supervisors', supervisors)}
                    <div className="flex flex-col">
                      <label>Supervisor</label>
                      {isLoading ? (
                        <p>Loading...</p>
                      ) : (
                        <Select
                          options={supervisorsOptions}
                          isMulti
                          defaultValue={formData.supervisors}
                          onChange={handleSupervisorChange}
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                          }}
                        />
                      )}
                      {formErrors.supervisors && (
                        <p style={{ color: 'red' }}>{formErrors.supervisors}</p>
                      )}
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button
                        type="submit"
                        color="green"
                        extraStyling="py-2 px-4 mb-1 mr-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        Update
                      </Button>
                    </div>
                  </form>
                </Section>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditUserTask;
