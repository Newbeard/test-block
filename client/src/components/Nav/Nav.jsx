import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';
import { useSelector  } from 'react-redux';


export default function Nav() {
  const id = JSON.parse (localStorage.getItem ("userId"))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const { values } = useSelector( state => state.user)
  const hendlerClick = (event) => {
    event.preventDefault()
    dispatch(userLogout())
    navigate('/')

  }
  return (
  <nav className="uk-navbar-container uk-margin navbeckgraund" uk-navbar="mode: click">
    {!id? 
      <div className="uk-navbar-left">
       <ul className="uk-navbar-nav">
        <li><Link to="/login">SignIn</Link></li>
        <li><Link to="/registation">SignUp</Link></li>
       </ul>
      </div>:
        <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
        <li><Link to="/">Home</Link></li>
         <li><Link to="/profile">Profile</Link></li>
         <li><Link to="#" href="#" onClick={hendlerClick}>Logout</Link></li>
        </ul>
       </div>
    }
  </nav>
  );
}
