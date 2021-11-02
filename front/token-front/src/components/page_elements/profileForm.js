import React, { useEffect, useState } from "react"
import ChangePasswordWindow from "./changePasswordWindow";
import Loader from "../library/loader";
import { login } from "../../state_container/actions";
import { useLayoutEffect } from "react";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from "../library/error-message";
import { SuccessMessage } from "../library/error-message";
import { logout } from "../../state_container/actions";
import axios from "axios";

const ProfileForm = () =>{
    const dispatch = useDispatch()
    const logied = useSelector(state => state.logied);
    const userId = useSelector(state => state.userId);
    const userEmail = useSelector(state => state.userEmail);
    const token = useSelector(state => state.token);
    const [pageData, setPageData] = useState({
      showPassword: false,
      email: "",
      name: "",
      adress: "",
      hasReferal: false,
      byReferalOf: "Gay",
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
          url: 'api/private/get_profile_user', 
          secure: true,
          headers: {},
          data: {
              "userId": userId,
              "token": token
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
              email: response.data.email,
              name: response.data.name,
              adress: response.data.adress,
              byReferalOf: response.data.byReferalOf[0],
              hasReferal: response.data.hasReferal
             })
          }
          if(response.data.hasOwnProperty('invalidToken')){
            dispatch(logout())
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
    const showWindowChangePassword = () =>{
         setPageData({
           ...pageData,
           isLoading: true
         })

          axios({
            method: 'post', 
            url: 'api/public/changePassword_sendCode', 
            secure: true,
            headers: {},
            data: {
                "email" : userEmail,
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
         url: 'api/private/save_user_data', 
         secure: true,
         headers: {},
         data: {
             "email" : pageData.email,
             "name": pageData.name,
             "adress": pageData.adress,
             "userId": userId,
             "token": token
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
    return(
<React.Fragment>
     {pageData.hasError && <ErrorMessage message={pageData.errorMessage} />}
     {pageData.hasSuccessAction && <SuccessMessage message={pageData.actionSuccessMessage}/> }
     {pageData.isLoading &&  <Loader />}
     {!logied && <Redirect to="/login"/>}
     {pageData.showWindowChangePassword && 
            <ChangePasswordWindow
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
                
                    <button className="btn butSmall" onClick={showWindowChangePassword} type="button"><span className="btn__text ">Change password</span>
                        </button>
                      
              <h3>Name</h3>
              <input type="text"  name="name" value={pageData.name} onChange={onChangeFormValueAction}></input>

              <h3>Adress</h3>
              <input type="text" name="adress" value={pageData.adress} onChange={onChangeFormValueAction} ></input>
              {pageData.hasReferal && 
                <React.Fragment>
                <h3>Register by referal link of user: </h3>
                <input type="text" name="adress" className="readonly_input" readOnly={true} value={pageData.byReferalOf.name} onChange={onChangeFormValueAction} ></input>
                </React.Fragment>
              }

              <button className="btn" type="button" onClick={saveUserData}><span className="btn__text">Save changes</span>
                        </button><span>    </span>
          </div>


      </div>
      </React.Fragment>
    )
}
export default ProfileForm