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
    byRefeal: false,
    referalLink: '',
    refedUserId: 0,
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
              "password" : pageData.password,
              "isReferal": pageData.isReferal,
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
  const checkReferalLink = () =>{
    setPageData({
      isLoad: true
    })
        axios({
          method: 'get', 
          url: pageData.referalLink, 
          secure: true,
          headers: {},
          params: {
              // "email" : pageData.email,
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
            alert("Referal link is valid!")
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
  const useReferalLink = () =>{
    setPageData({
      ...pageData,
      byRefeal: !pageData.byRefeal
    })
    if(!pageData.byRefeal){
      checkReferalLink()
    }
  }
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
                  additionalInputField = {
                    <React.Fragment>
                      <div className="form__item">
                        <label>Referal link</label>
                        <input type="text" name="referalLink" required={false} value={pageData.referalLink} onChange={onChangeFormValueAction}/>
                        <input type="checkbox" onClick={useReferalLink} className="passwCheckBox" name="byReferal" /> <span className="passwCheckBoxText">Sign up by referal link</span>     
                     </div>
                    </React.Fragment>
                  } 
                />}
            </div>
      </div>
    )
}
export default SignUp