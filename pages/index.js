import { useSelector } from "react-redux";
import Login from "./LoginForm";
import Header from "../components/Header";
import { Fragment } from "react";
import Homepage from "./HomePage";
import CreateCat from "./CreateNew";


const login = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    return (
        <Fragment>
            <Header />
            {!isAuth && <Login />}
            {isAuth && <Homepage />}
        </Fragment>

    )
}
export default login

