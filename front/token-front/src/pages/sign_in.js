import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/page_elements/form";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../state_container/actions'
import axios from 'axios';
import { Redirect } from "react-router";
import Loader from "../components/library/loader";
import ErrorMessage from "../components/library/error-message";
import ChangePasswordWindow from "../components/page_elements/changePasswordWindow";
import InputForm from "../components/library/input_form";
import { use_user_email } from "../state_container/actions";

const SignIn = (props) =>{
  const logied = useSelector(state => state.logied);
  const dispatch = useDispatch();
  const [pageData, setPageData] = useState({
    email: props.login,
    password: '',
    hasError: false,
    errorMessage: '',
    isLoad: false,
    showPasswordRecovery: false,
    showEmailEnter: false
 })

   const validate = () =>{
     if((pageData.password == "")){
       setPageData({
          hasError: true,
          errorMessage: "Incorrect passoword"
       })
       return false
     }
     return true
   }
   const try_to_login = () =>{
        if(!validate()){
          return
        }
        setPageData({
          isLoad: true
        })
        if(pageData.password == ''){
          setPageData({
            ...pageData,
            hasError: true,
            errorMessage: "Password cannot be void"
          })
        }
        axios({
          method: 'post', 
          url: 'access-control/login', 
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
            hasError: !response.data.success,
            errorMessage: response.data.message
          })
          if(response.data.success){
            dispatch(login({
                userId: response.data.user.id,
                token: response.data.token,
                userEmail: pageData.email
            }))
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


   const sendConfirmCode = () =>{
        setPageData({
          ...pageData,
          isLoading: true
        })
        dispatch(use_user_email({
           userEmail: pageData.email
        }))

        axios({
          method: 'post', 
          url: 'api/public/changePassword_sendCode', 
          secure: true,
          headers: {},
          data: {
              "email" : pageData.email,
          }
      })
      .then(response=> {
          setPageData({
            ...pageData,
            isLoading:false,
            hasError: response.data.error,
            errorMessage: response.data.message
          })
          if(!response.data.error){
            setPageData({
              ...pageData,
              showPasswordRecovery: true,
              showEmailEnter: false,

              })
          }
      }) 
      .catch( err=>{
          setPageData({
              ...pageData,
              isLoading: false,
              hasError: true,
              errorMessage: "Cannot do request to server. Try again later. "+err,
              showEmailEnter: false
          })
      })
    
    }
   const onChangeFormValueAction = e => {
    setPageData({
           ...pageData,
           [e.target.name]: e.target.value
         });
    };
    const showEmailEnter = () =>{
      setPageData({
        ...pageData,
        showEmailEnter: true
      })
    }

    const hideWindowRecoverPassword = () =>{
      setPageData({
        ...pageData,
        showPasswordRecovery: false
      })
   }
    return(
      <React.Fragment>
         <div className="signup">
       
           {logied && <Redirect to="/dashboard"/>}
           <div className="container">
            {pageData.showEmailEnter && 
                <InputForm 
                    title= "Enter your email"
                    typeOfValue= "text"
                    linkAfterClose= "/login"
                    buttonText= "Send code"
                    onChangeValue = {onChangeFormValueAction}
                    submitAction = {sendConfirmCode}
                    valueForInput = {pageData.email}
                    nameOfInput = "email"
                    hasError = {pageData.hasError}
                    errorMessage = {pageData.errorMessage}
                    isLoad = {pageData.isLoad}
                />
            }
           {pageData.showPasswordRecovery && 
              <ChangePasswordWindow
                closeAction={hideWindowRecoverPassword}
              />
            }
              <Form
                email={pageData.email}
                password={pageData.password}
                hasError={pageData.hasError}
                errorMessage={pageData.errorMessage}
                isLoad= {pageData.isLoad}
                formTitle="Sign in"
                formButtonText = "Login" 
                onChangeAction = {onChangeFormValueAction}
                onSubmitAction = {try_to_login}
                footer = { 
                  <React.Fragment>
                     <a className="clickable" onClick={showEmailEnter}>Forgot password?</a>
                    <p>You have not an account? <Link to="signup"> <a>Sign up here!</a></Link></p>
                  </React.Fragment>
                } 
              />
            </div>
      </div>
      </React.Fragment>
    )
}
export default SignIn