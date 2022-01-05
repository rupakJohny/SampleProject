import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import classes from './LoginForm.module.css'
import { Fragment } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
const Login = () => {
  
const dispatch=useDispatch();

  const values = {
    email: "",
    password: "",

  };
  const [initialState, setState] = useState(values);
  const { email, password } = initialState;
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...initialState,
      [name]: value,
    });
  }

  async function onSubmit  ()  {
    console.log(initialState)
    let reqBody = {
      "email": email,
      "password": password,
    };
    let authenticateAPI = await axios.post("http://devapi.carowlers.com/api/authenticate", reqBody);
    console.log(authenticateAPI);
    if (authenticateAPI.status === 200) {
      let token=authenticateAPI.data.id_Token;
      console.log(token);
      localStorage.setItem("token", token);
      dispatch(authActions.login())
    }
    
  }

  return (
    <Fragment >
      <div className={classes.form}>
        <div className='container'>
          <h3>Log In</h3>

          <div className="form-group">
            <label>Email </label>
            <input type="email" className="form-control" name='email' placeholder="Enter email" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name='password' placeholder="Enter password" onChange={handleChange} />
          </div>
          <div className={classes.button}>
            <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Login</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Login