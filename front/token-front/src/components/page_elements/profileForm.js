import React, { useEffect, useState } from "react"
import ModalWindow from "./modalWindow";
import Loader from "../library/loader";
import { login } from "../../state_container/actions";
import { useLayoutEffect } from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import ErrorMessage from "../library/error-message";
import { SuccessMessage } from "../library/error-message";
import axios from "axios";

const ProfileForm = () =>{
    const logied = useSelector(state => state.logied);
    const userId = useSelector(state => state.userId);
    const [pageData, setPageData] = useState({
      showPassword: false,
      password: "",
      email: "",
      name: "",
      adress: "",
      showWindowChangePassword: false,
      isLoading: false,
      hasError: false,
      errorMessage: '',
      hasSuccessAction: false,
      actionSuccessMessage: ''
    })
    useEffect(() => {
        setPageData({
          ...pageData,
          isLoading: true
        })
        axios({
          method: 'post', 
          url: 'access-control/get_profile_user', 
          secure: true,
          headers: {},
          data: {
              "userId" :userId,
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
              password:response.data.user.password,
              email: response.data.user.email,
              name: response.data.user.name,
              adress: response.data.user.adress,
             })
          }
      }) 
      .catch( err=>{
          setPageData({
              ...pageData,
              isLoading: false,
              hasError: true,
              errorMessage: "Cannot do request to server. Try again later. "+err
          })
      })
    }, [])
    const onChangeFormValueAction = e => {
      setPageData({
             ...pageData,
             [e.target.name]: e.target.value
           });
         };
      const showHidePassword = () =>{
          setPageData({
            ...pageData,
            showPassword: !pageData.showPassword
          })
      }
    const showWindowChangePassword = () =>{
         setPageData({
           ...pageData,
           isLoading: true
         })

          axios({
            method: 'post', 
            url: 'access-control/changePassword_sendCode', 
            secure: true,
            headers: {},
            data: {
                "email" : pageData.email,
                "userId": userId
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
                showWindowChangePassword: true
               })
            }
        }) 
        .catch( err=>{
            setPageData({
                ...pageData,
                isLoading: false,
                hasError: true,
                errorMessage: "Cannot do request to server. Try again later. "+err
            })
        })
      
    }
    const saveUserData = () =>{
      setPageData({
        ...pageData,
        isLoading: true
      })

       axios({
         method: 'post', 
         url: 'access-control/save_user_data', 
         secure: true,
         headers: {},
         data: {
             "email" : pageData.email,
             "name": pageData.name,
             "adress": pageData.adress,
             "userId": userId
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
             hasSuccessAction: true,
             actionSuccessMessage: "Data saved succesful!"
            })
         }
     }) 
     .catch( err=>{
         setPageData({
             ...pageData,
             isLoading: false,
             hasError: true,
             errorMessage: "Cannot do request to server. Try again later. "+err
         })
     })
    }
    const hideWindowChangePassword = () =>{
      setPageData({
        ...pageData,
        showWindowChangePassword: false
      })
   }
    var passowordInputType = pageData.showPassword ? "text" : "password"
    return(
<React.Fragment>
     {pageData.hasError && <ErrorMessage message={pageData.errorMessage} />}
     {pageData.hasSuccessAction && <SuccessMessage message={pageData.actionSuccessMessage}/> }
     {pageData.isLoading &&  <Loader />}
     {!logied && <Redirect to="/login"/>}
     {pageData.showWindowChangePassword && 
            <ModalWindow
               closeAction={hideWindowChangePassword}
            />
        }
       {pageData.isLoading && <Loader />}
        <div className="dashboard__block container profile">
      
          <div className="widget-form__header widget-form__header--center">
            <h3 className="center_text">Your personal user-data</h3>
          </div>
          
          <div className="form " autoComplete="off">
              <h3>Email</h3>
              <input type="email" autoComplete="off" name="email" value={pageData.email} onChange={onChangeFormValueAction}></input>
              <h3>Password</h3>
              <div className="widget-form__form">
                     <input autoComplete="off" type={passowordInputType} readOnly={true} name="password" value={pageData.password} onChange={onChangeFormValueAction}/> 

                    <div>
                       
                    <button className="btn butSmall butShowHide" type="button" onClick={showHidePassword}><span className="btn__text ">Show</span>
                        </button>
                           
                    </div>
                </div>
                
                    <button className="btn butSmall" onClick={showWindowChangePassword} type="button"><span className="btn__text ">Change password</span>
                        </button>
                      
              <h3>Name</h3>
              <input type="text"  name="name" value={pageData.name} onChange={onChangeFormValueAction}></input>

              <h3>Adress</h3>
              <input type="text" name="adress" value={pageData.adress} onChange={onChangeFormValueAction} ></input>

              <button className="btn" type="button" onClick={saveUserData}><span className="btn__text">Save changes</span>
                        </button><span>    </span>
          </div>


      </div>
      </React.Fragment>
    )
}
export default ProfileForm