import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../Firebase";
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

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
      }).then((register)=>{
        firebase.firestore().collection('users').add({
          email:email.value,
          userName:userName.value,
          admin:false,
          Colonia:false,
          Manada:false,
          Tropa:false,
          Unidad:false,
          Clan:false
          
        })
      })
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div class="auth">
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
        <button type="submit" class="btn btn-success">Sign Up</button>
        <br/>
        <label>
            <Link to={`Login`}>Login</Link>
          </label>
      </form>
    </div>
  );
};

export default withRouter(SignUp);