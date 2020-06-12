import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../Firebase";
import { Link } from 'react-router-dom';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password ,userName} = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
      app.auth().currentUser.updateProfile({
        displayName: userName.value
      })
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div class="container">
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
      <label>
          User Name
          <input name="userName"  placeholder="UserName" required/>
        </label>
        <br/>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <br/>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <br/>
        <button type="submit">Sign Up</button>
      </form>
      <div>
          <label>
            <Link to={`Login`}>Login</Link>
          </label>
      </div>
    </div>
  );
};

export default withRouter(SignUp);