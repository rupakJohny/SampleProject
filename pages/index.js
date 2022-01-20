import { useSelector } from "react-redux";
import Login from "./LoginForm";
import { Fragment } from "react";
import dynamic from "next/dynamic";

const Homepage = dynamic(() => import('./HomePage'), { ssr: false });
const Header = dynamic(() => import('../components/Header'), { ssr: false });

const login = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    return (
        <Fragment>
            <div>
                {!isAuth && <Login />}
                {isAuth && <Homepage />} 
                </div>           
        </Fragment>

    )
}
export default login

