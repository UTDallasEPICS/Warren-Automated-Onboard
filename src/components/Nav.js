import { useNavigate } from 'react-router-dom'
import logo from '../images/crm-logo.png'

const Nav = () => {

  const navigate = useNavigate()

  return (
    <nav>
      <div className="logo-container" onClick={() => navigate('/')}>
        <img src={logo} alt="logo"/>
      </div>
      <div className="controls-container">
        <div className="icon" onClick={() => navigate('/ticket')}>Add Task</div><hr/>
        <div className="icon" onClick={() => navigate('/')}>Logout</div>
      </div>
    </nav>
  )
}

export default Nav