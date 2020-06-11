import React from "react";
import {BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Application from "./components/Aplication";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./PrivateRoute";
import create from './components/create';
import edit from './components/edit';
import User from "./components/user";
import changeUser from "./components/changeUser";


const App= () => {
  return (
  <AuthProvider>
    <Router>
        <div>
          <PrivateRoute exact path="/" component={Application} />
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/create" component={create}/>
          <Route exact path="/edit" component={edit}/>
          <Route exact path="/user" component={User}/>
          <Route exact path="/changeUser" component={changeUser}/>
        </div>
    </Router>
  </AuthProvider>
  );
};
export default App;

