import React, { useEffect, useState } from "react"
import Loader from "../library/loader"
import ErrorMessage from "../library/error-message"
import axios from "axios"
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { Link } from "react-router-dom"
const ChangePasswordWindow = (props) =>{
    /*
        Props
        1. CloseAction
        2. CloseSaveAction
        3. EnterEmail - true - component will request email, false - component take email from app-state
    */
    const [pageData, setPageData] = useState({
        isLoading: false,
        confirmCode: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        passoworsMatch: false,
        codeTyped: false,
        codeCorrect: false,
        isPasswordChange: false,
        currentEmail: '',
    })
    const userEmail = useSelector(state => state.userEmail);
    const checkConfirmCode = () =>{
        setPageData({
            ...pageData,
            isLoading: true,
        })
         axios({
            method: 'post', 
            url: 'api/public/changePassword_checkCode', 
            secure: true,
            headers: {},
            data: {
                "email": userEmail,
                "code": pageData.confirmCode
            }
        })
        .then(response=> {
            console.log(response.data)
            setPageData({
              ...pageData,
              isLoading:false,
              hasError: response.data.error,
              errorMessage: response.data.message,
              codeCorrect: !response.data.error,
              codeTyped: true,
            })
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
    const resetPasswordAction = () => {
        setPageData({
            ...pageData,
            isLoading: true,
        })
        axios({
            method: 'post', 
            url: 'api/public/changePassword_writeNewPassword', 
            secure: true,
            headers: {},
            data: {
                "email" :userEmail,
                "password": pageData.password
            }
        })
        .then(response=> {
            setPageData({
              ...pageData,
              isLoading:false,
              hasError: response.data.error,
              errorMessage: response.data.message,
              codeCorrect: !response.data.error,
              isPasswordChange: !response.data.error
            })
            if(!response.data.error)
                props.closeAction()
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
    const onChangeFormValueAction = e => {
        setPageData({
               ...pageData,
               [e.target.name]: e.target.value
             });
    };
    
      const onPasswordsChange = e => {
        setPageData({
            ...pageData,
            [e.target.name]: e.target.value,
          });
    }
        const showHidePassword = () =>{
            setPageData({
              ...pageData,
              showPassword: !pageData.showPassword
            })
        }
        const showHideConfirmPassword = () =>{
            setPageData({
              ...pageData,
              showConfirmPassword: !pageData.showConfirmPassword
            })
        }
        const checkPasswords  = () =>{
            var conf = pageData.confirmPassword === pageData.password
            setPageData({
                ...pageData,
                passoworsMatch: conf
            })
        }
    var passowordInputType = pageData.showPassword ? "text" : "password"
    var passowordConfirmInputType = pageData.showConfirmPassword ? "text" : "password"

    return(
        <React.Fragment>
       
    <div className='modalWindow' >
        <div className='modalWindow-dialog container dashboard__block container profile' >
        <div className="form " autoComplete="off">
            
        {pageData.isPasswordChange && props.closeAction}
        {pageData.hasError && <ErrorMessage message={pageData.errorMessage}/>}
        {pageData.isLoading && <Loader additional="loader-local"/>}
        {!pageData.codeTyped ? 
          <React.Fragment>
            <div className="widget-form__header widget-form__header--center">
                <h5 className="center_text small_text">The confirm code sent to you email. Check it and type this code here</h5>
            </div>
                <div className="signup body">
                        <input autoComplete="off" type="number"  name="confirmCode" value={pageData.confirmCode} onChange={onChangeFormValueAction} /> 

                        <div className="form__item center">
                          <center> 
                                <button className="btn butCenter butSmall" onClick={checkConfirmCode} type="button" ><span className="btn__text ">Ok</span>
                            </button>
                        </center>
                        </div>
                    </div>
               
            </React.Fragment>
            :
                pageData.codeCorrect ? 
                 <div className="form " autoComplete="off">
                    {pageData.passoworsMatch === false &&  <ErrorMessage message= "Passwords do not match!"/>}
                 <h3>Password</h3>
                <div className="widget-form__form">
                    <div className="row">
                        <input onClick={checkPasswords} onBlur={checkPasswords} autoComplete="off" type={passowordInputType}  name="password" value={pageData.password} onChange={onPasswordsChange}/> 
                        <div>  
                                <button className="btn butSmall butShowHide" type="button" onClick={showHidePassword}><span className="btn__text ">Show</span>
                                </button>     
                        </div>
                      </div>
                  </div>
                  <br/>
                  <h3>Confirm password</h3>
                  <div className="widget-form__form">
                    <div className="row">
                        <input onClick={checkPasswords} onBlur={checkPasswords} autoComplete="off" type={passowordConfirmInputType}  name="confirmPassword" value={pageData.confirmPassword} onChange={onPasswordsChange}/> 
                        <div>  
                                <button className="btn butSmall butShowHide" type="button" onClick={showHideConfirmPassword}><span className="btn__text ">Show</span>
                                </button>     
                        </div>
                      </div>
                  </div>
                  <br/>
                  <div className="widget-form__form">
                  <button className="btn" type="button" onClick={resetPasswordAction} disabled={!pageData.passoworsMatch}  ><span className="btn__text">Change password</span>
                        </button><span>    </span>
                        <button className="btn" type="button"  onClick={props.closeAction}><span className="btn__text">Cancel</span>
                        </button><span>    </span>
                  </div>
                      
            </div>
                :
                <div className="widget-form__header widget-form__header--center">
                    <h5 className="center_text small_text">You entered incorrect confirm code</h5>
                    <center><button className="btn btnSmall" style={{marginLeft:100}} onClick={props.closeAction} type="button" ><span className="btn__text ">Close</span>
                            </button></center>
                </div>
            }
           </div>
         
        </div>
        <div onClick={props.closeAction} class="cl-btn-2">
       <div>
                <div class="leftright"></div>
                <div class="rightleft"></div>
                 <span class="close-btn">Close</span> 
            </div>
      </div>
    </div>
    </React.Fragment>
    )
}
export default ChangePasswordWindow