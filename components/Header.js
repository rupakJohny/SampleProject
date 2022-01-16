import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import ViewCategory from "./ViewCategory";
import classes from './Header.module.css';
import { useEffect } from "react";

const Header = () => {
  const dispatch=useDispatch();
  const isAuth= useSelector(state=>state.auth.isAuthenticated);

  const logoutHandler=()=>{
    localStorage.getItem('token');
    localStorage.removeItem('token');
    dispatch(authActions.logout())
  }


  return (
    <header className={classes.header}>
      <h1>Sample</h1>
      {isAuth && (
      <nav>
        <ul>
         
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
      )}
    </header>
  );
};

export default Header;
