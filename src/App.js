import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Nav from './components/Nav'
import Dashboard from './pages/Dashboard'
import TicketPage from './pages/TicketPage'
import CategoriesContext from './context'

const App = () => {
  const [categories, setCategories] = useState(null)
  const value = { categories, setCategories }

  return (
    <div className="app">
      <CategoriesContext.Provider value={value}>
        <BrowserRouter>
          <Nav/>
          <Routes>
            {/* <Route path="/" element={<LoginPage/>} /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route path="/ticket/:id" element={<TicketPage editMode={true} />} />
            {/*<Route path= "/admin" element={ <div><Nav/><FullLayout/></div>}>
              <Route path='/admin/NewEmployeeForm' element = {<NewEmployeeForm/>}/>
              <Route path="/admin/Account" element={<Account/>}/>
              <Route path='/admin/Account/ChangePassword' element = {<div></div>}/>
              <Route path='/admin/Account/EditInformation' element = {<div></div>}/>
              <Route path='/admin/CurrentOnboarding' element={<CurrentOnboarding/>} />
              <Route path='/admin/NewEmployeeForm' element = {<NewEmployeeForm/>}/>
            </Route> 
            */}
          </Routes>
        </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  )
}

export default App
