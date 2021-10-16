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

const SignIn = (props) =>{
  const logied = useSelector(state => state.logied);
  const dispatch = useDispatch();
  const [pageData, setPageData] = useState({
    email: props.login,
    password: '',
    hasError: false,
    errorMessage: '',
    isLoad: false
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
                token: response.data.token
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

   const onChangeFormValueAction = e => {
    setPageData({
           ...pageData,
           [e.target.name]: e.target.value
         });
    };

    return(
      <React.Fragment>
         <div className="signup">
       
           {logied && <Redirect to="/dashboard"/>}
           <div className="container">
      
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
                footer = { <p>You have not an account? <Link to="signup"> <a>Sign up here!</a></Link></p>} 
              />
            </div>
      </div>
      </React.Fragment>
    )
}
export default SignIn