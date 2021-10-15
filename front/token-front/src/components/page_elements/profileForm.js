import React, { useState } from "react"
import ModalWindow from "./modalWindow";
import Loader from "../library/loader";

const ProfileForm = () =>{
    const [pageData, setPageData] = useState({
      showPassword: false,
      password: "",
      email: "",
      name: "",
      adress: "",
      showWindowChangePassword: false,
      isLoading: false
    })
    const resetPassword = () =>{
       //axios for reset password will be here
       //after that axios page data must to ould update password value
       alert("Password changed")
       hideWindowChangePassword()
    }
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
      //axios for sending condirm code will here
       setPageData({
        showWindowChangePassword: true
       })
    }
    const hideWindowChangePassword = () =>{
      setPageData({
        showWindowChangePassword: false
      })
   }
    var passowordInputType = pageData.showPassword ? "text" : "password"
    return(
<React.Fragment>
     {pageData.showWindowChangePassword && 
            <ModalWindow
               closeAction={hideWindowChangePassword}
               closeSaveAction={resetPassword}
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

              <button className="btn" type="button"><span className="btn__text">Save changes</span>
                        </button><span>    </span>
          </div>


      </div>
      </React.Fragment>
    )
}
export default ProfileForm