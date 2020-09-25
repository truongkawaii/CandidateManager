import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="center">
      <div className="form-signup">
        <div className="tab-content">
          <div id="signup">
            <h1>Register</h1>
            <p>Create your account. It's free and only takes a miute.</p>
            <form>
              <div className="top">
                <div id="left" className="field-wrap">
                  <input type="text" placeholder="First Name" />
                </div>
                <div id="right" className="field-wrap">
                  <input type="text" placeholder="Last Name" />
                </div>
              </div>
              <div className="field-wrap">
                <input type="email" placeholder=" Email" />
              </div>
              <div className="field-wrap">
                <input type="password" placeholder="Password" />
              </div>
              <div className="field-wrap">
                <input type="password" placeholder=" Confirm Password" />
              </div>
              <input type="checkbox" id="c1" name="cc" />
              <label>
                <Link to="/login">I accept the Term of Use Privacy Policy</Link>
              </label>
              <button type="submit" className="button button-block">
                Register Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
