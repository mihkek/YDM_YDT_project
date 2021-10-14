import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/page_elements/form";
import MessageWithButton from "../components/page_elements/messageWithButton";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Redirect } from "react-router";
import {signup} from '../state_container/actions'

const SignUp = () =>{
  const dispatch = useDispatch();
  const isWaitingForSignUp = useSelector(state => state.isWaitingForSignUp);
  const [userData, setUserData] = useState({
    login: '',
    password: '',
    hasError: false,
    errorMessage: ''
 })
  const try_to_signup = () =>{
      //request to back will be here
      dispatch(signup())
  }
  const onChangeFormValueAction = e => {
    setUserData({
           ...userData,
           [e.target.name]: e.target.value
         });
       };
    return(
    
         <div className="signup">
           <div className="container">
             {isWaitingForSignUp ? 
                <MessageWithButton
                    title="Confirm-message sent to your email!"
                    message="Check your email. A letter from our cite will have title 'YD Dragon'"
                    buttonLink="/"
                    buttonText="Go back"
                /> 
                :
                <Form
                  hasError={userData.hasError}
                  errorMessage={userData.errorMessage}
                  onChangeAction = {onChangeFormValueAction}
                  onSubmitAction = {try_to_signup}
                  formTitle="Sign up"
                  formButtonText = "Create a new account" 
                  footer = { <p>You Already have an account <Link to="/login"> <a>Login Here</a></Link></p>} 
                />}
            </div>
      </div>
    )
}
export default SignUp