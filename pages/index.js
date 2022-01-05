import { useSelector } from "react-redux";

import Login from "../components/LoginForm";
import Header from "../components/Header";
import { Fragment } from "react";
import Homepage from "../components/HomePage";

const login=()=>{
    const isAuth= useSelector(state=>state.auth.isAuthenticated);

    return(      
         
        <Fragment>
        <Header/>
        {!isAuth && <Login/>}
        {isAuth && <Homepage/>}
        </Fragment>
        
    )
}
export default login