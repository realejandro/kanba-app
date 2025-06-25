import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className='nav-title navbar-start'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <div className='navbar-center'></div>
      <ul className='navbar-end'>
      {
        !loginCheck ? (
          <li className='nav-item' >
            <button type='button'>
              <Link to='/login'style={{color:"white"}}>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button'
              style={{color:"white"}} 
              onClick={() => {
              auth.logout();
            }}>
              Logout
            </button>
          </li>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;
