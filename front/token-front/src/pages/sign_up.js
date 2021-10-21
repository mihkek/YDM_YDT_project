import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/page_elements/form";
import MessageWithButton from "../components/page_elements/messageWithButton";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Redirect } from "react-router";
import {signup} from '../state_container/actions'
import { parseLink } from "../static/functions/parseLink";

const SignUp = (props) =>{
  /*
    location.props: (not required!)
    1. byReferal
    2. refedUserId
    3. refeduserName
  */
  const dispatch = useDispatch();
  const isWaitingForSignUp = useSelector(state => state.isWaitingForSignUp);
  const logied = useSelector(state => state.logied);
  console.log("Sign up - ")
  console.log(props)

  const [pageData, setPageData] = useState({
    email: '',
    password: '',
    hasError: false,
    errorMessage: '',
    isLoad: false,
    byReferal: props.location.props === undefined ? false : props.location.props.byReferal,
    refedUserId: props.location.props === undefined ? -1 : props.location.props.refedUserId,
    refedUserName: props.location.props === undefined ? -1 : props.location.props.refedUserName
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
              "password" : pageData.password,
              "isReferal": pageData.byReferal,
              "refedUserId": pageData.refedUserId
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
           {logied && <Redirect to="/dashboard"/>}
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
                  footer = { 
                      <React.Fragment>
                        <p>You Already have an account <Link to="/login"> <a>Login Here</a></Link></p>
                        {pageData.byReferal ? <p>You will register on cite by referal link of {pageData.refedUserName}</p>
                         : <p>Have referal link? <Link to="/signup_referal"> <a>Click here</a></Link> </p> }
                      </React.Fragment>}
                />}
            </div>
      </div>
    )
}
export default SignUp