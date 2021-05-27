import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../Firebase.js";
import { AuthContext } from "./Auth.js";
import { Link } from 'react-router-dom';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } =  (AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div class="auth">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit" class="btn btn-success">Log in</button>
        <br/>
        <label>
            <Link to={`SignUp`}>Sing Up</Link>
          </label>
      </form>
    </div>
  );
};

export default withRouter(Login);