import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const handleOnChange = props => event => {
    setValues({ ...values, [props]: event.target.value });
    // console.log(values, 'values');
  };
  return (
    <div className="login-form-bg">
      <div className="login-page">
        <div className="form">
          <h3>ACCOUNT LOGIN</h3>
          <form className="login-form">
            <label>username</label>
            <input type="text" onChange={handleOnChange('username')} />
            <label>password</label>
            <input onChange={handleOnChange('password')} type="password" />
            <div className="active">
              <label className="control control--checkbox">
                Remember Me
                <input type="checkbox" />
                <div className="control__indicator" />
              </label>
              <Link to="/recruitment">Forgot Password?</Link>
            </div>
            <button type="submit">login</button>
          </form>
          <h2 className="create-acc">
            <Link to="/signup">Create a Account !</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
