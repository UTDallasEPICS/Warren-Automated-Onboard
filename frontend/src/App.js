import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SuperNavbar from './components/SuperNavbar';
import HomeS from './pages/HomeS';
import Messages from './pages/Messages';
import LoginForm from './components/LoginForm.jsx';
import TaskForm from './components/TaskForm';
import Account from './pages/Account';
import CurrentOnboarding from './pages/CurrentOnboarding';
import FullLayout from './layouts/FullLayout';
import NewEmployeeForm from './pages/NewEmployeeForm.js';
import NewSupervisorForm from './pages/NewSupervisorForm.js';
import DefaultTasks from './pages/DefaultTasks';
import  Home_newhire from './pages/Home_newhire'; 
import Navbar_newhire from './components/Navbar_newhire';
import { Container, Row, Col} from 'reactstrap';
import {useState, useEffect} from 'react';
import DatabaseFunctions from './Database/DatabaseFunctions.js';
import Newhirechecklist from './pages/Newhirechecklist.js';
import New_hire_profile from './pages/New_hire_profile.js';
import AccountS from './pages/AccountS.js';
import NewEmployee from './pages/NewEmployee.js';
import FullLayoutSuper from './layouts/FullLayoutSuper';
import OnBoardingSV from './pages/OnBoardingSV';
import AddUser from './pages/addUser';
import AdminDashboard from './pages/adminDashboard';
import Employee from './components/Employee';
import EmployeeTasksPage from './pages/employeeTasksPage';
import newTask from './pages/newTask';


function App() {
  
  const [dataBase, setDb] = useState([])

  useEffect( () => {
    fetchDB();
  }, [])

  const fetchDB = async () => {
    const response = await fetch("http://localhost:5010/Employee");
    const data = await response.json();
    setDb(data);
  }

  return (
    <>
     
      { /*defining routes*/ }
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element= {<LoginForm/>}/>
          <Route path = "/" element= {<LoginForm/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path="/home" element={<div><Navbar/><Home/><Container><CurrentOnboarding/></Container></div>}/>
          <Route path= "/New_hire_profile" element={ <div><Navbar_newhire/><New_hire_profile/></div>}></Route>
          <Route path= "/home_newhire" element = {<div><Navbar_newhire/><Home_newhire/><Container><Newhirechecklist/></Container></div>}/>
          <Route path="/home" element={<div><Navbar/><Home/><Container><CurrentOnboarding/></Container></div>}/>
          <Route path= "/admin" element={ <div><Navbar/><FullLayout/></div>}>
            <Route path="/admin/Account" element={<Account/>}/>
            <Route path='/admin/Account/ChangePassword' element = {<div></div>}/>
            <Route path='/admin/Account/EditInformation' element = {<div></div>}/>
            <Route path='/admin/CurrentOnboarding' element={<CurrentOnboarding/>} />
            <Route path='/admin/NewEmployeeForm' element = {<NewEmployeeForm/>}/>
            <Route path='/admin/DefaultTasks' element = {<DefaultTasks/>}/> 
            <Route path='/admin/NewSupervisorForm' element = {<NewSupervisorForm/>}/>
            <Route path='/admin/addUser' element = {<AddUser/>}/>
            <Route path='/admin/adminDashboard' element = {<AdminDashboard/>}/>
            <Route path='/admin/employees/:id' element = {<Employee/>}/>
            <Route path='/admin/EmployeeTasksPage' element = {<EmployeeTasksPage/>}/>
            <Route path='/admin/newTask' element = {<newTask/>}/>
          </Route>
          <Route path = "/homeS" element = {<div><SuperNavbar/><HomeS/><Container><OnBoardingSV/></Container></div>}/>
          <Route path = "/supervisor" element = {<div><SuperNavbar/><FullLayoutSuper/></div>}>
            <Route path = "/supervisor/AccountS" element = {<AccountS/>}/>
            <Route path='/supervisor/AccountS/ChangePassword' element = {<div></div>}/>
            <Route path='/supervisor/AccountS/EditInformation' element = {<div></div>}/>
            <Route path = '/supervisor/NewEmployeeForm' element = {<NewEmployeeForm/>}/>
            <Route path = '/supervisor/OnBoardingSV' element = {<OnBoardingSV/>}/>
            <Route path = '/supervisor/DefaultTasks' element = {<DefaultTasks/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

//<Route path='/signIn' element = {<DatabaseFunctions/>}/> 
//<Route path='/confirmTask' element = {<DatabaseFunctions/>}/>
//<Route path='/makeAccount' element = {<DatabaseFunctions/>}/> 

export default App;


// import React from 'react';

// function OnboardingPage() {
//   return (
//     <div className="onboarding">
//       <h1>Welcome to The Warren Center!</h1>

//       <p>We're so glad you're here. The Warren Center has been serving children and families for over 60 years.</p>

//       <p>Our mission is to advocate for and provide services, resources and support to children with developmental differences and disabilities so they can reach their full potential.</p>  

//       <h2>New Family Onboarding</h2>

//       <ul>
//         <li>Learn about our programs and services</li>
//         <li>Meet your child's therapist</li>
//         <li>Discuss goals for your child</li>
//         <li>Schedule your first appointments</li>
//       </ul>

//       <button>Start Onboarding</button>
//     </div>
//   );
//}

//export default OnboardingPage;