import Link from 'next/link'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import classes from './LoginForm.module.css'
import { Fragment } from 'react'
import { useState } from 'react'

const Login = () => {

  const values = {
    email: "",
    password: "",

  };
  const [initialState, setState] = useState(values);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...initialState,
      [name]: value,
    });
  }

  const onSubmit = () => {
    console.log(initialState)
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