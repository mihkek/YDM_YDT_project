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
  const [pageData, setPageData] = useState({
    email: '',
    password: '',
    hasError: false,
    errorMessage: '',
    isLoad: false
 })
  const try_to_signup = () =>{
        setPageData({
          isLoad: true
        })
        axios({
          method: 'post', 
          url: 'access-control/signup', 
          secure: true,
          headers: {},
          data: {
              "email" : pageData.email,
              "password" : pageData.password
          }
      })
      .then(response=> {
          setPageData({
            ...pageData,
            isLoad:false,
            hasError: response.data.error,
            errorMessage: response.data.message
          })
          if(!response.data.error){
             dispatch(signup())
          }
      }) 
      .catch( err=>{
          setPageData({
              ...pageData,
              isLoad: false,
              hasError: true,
              errorMessage: "Cannot do request to server. Try again later. "+err
          })
      })
  }
  const onChangeFormValueAction = e => {
    setPageData({
           ...pageData,
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
                  isLoad={pageData.isLoad}
                  email={pageData.email}
                  password={pageData.password}
                  hasError={pageData.hasError}
                  errorMessage={pageData.errorMessage}
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