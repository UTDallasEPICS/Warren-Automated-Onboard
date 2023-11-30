import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/users';
import Departments from './pages/departments';
import Archive from './pages/archive';
import LoginPage from './components/LoginPage';

function App() {
	return (
		<Router>
			<LoginPage />
			{/* <Navbar /> */}
			{/* <Routes>
				<Route path="/users" element={<Users key="users"/>} />
				<Route path="/departments" element={<Departments />} />
				<Route path="/archive" element={<Archive />} />
			</Routes> */}
			<Routes>
				<Route path="/navbar" element={<Navbar />} />
			</Routes>
		</Router>
	);
}

export default App;