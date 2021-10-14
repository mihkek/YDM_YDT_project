import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/page_elements/form";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../state_container/actions'
import axios from 'axios';
import { Redirect } from "react-router";

const SignIn = (props) =>{
  const logied = useSelector(state => state.logied);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    login: props.login,
    password: '',
    hasError: false,
    errorMessage: ''
 })

   const try_to_login = () =>{
     //Request to back will be here
     setUserData({
       
     })
     dispatch(login())
   } 

   const onChangeFormValueAction = e => {
    setUserData({
           ...userData,
           [e.target.name]: e.target.value
         });
       };

    return(
         <div className="signup">
           {logied && <Redirect to="/dashboard"/>}
           <div className="container">
              <Form
                email={userData.login}
                password={userData.password}
                hasError={userData.hasError}
                errorMessage={userData.errorMessage}
                formTitle="Sign in"
                formButtonText = "Login" 
                onChangeAction = {onChangeFormValueAction}
                onSubmitAction = {try_to_login}
                footer = { <p>You have not an account? <Link to="signup"> <a>Sign up here!</a></Link></p>} 
              />
            </div>
      </div>
    )
}
export default SignIn