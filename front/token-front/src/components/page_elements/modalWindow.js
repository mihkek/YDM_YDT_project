import React, { useEffect, useState } from "react"
import Loader from "../library/loader"
import ErrorMessage from "../library/error-message"
const ModalWindow = (props) =>{
    /*
        Props
        1. CloseAction
        2. CloseSaveAction
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
        codeCorrect: false
    })
    const checkConfirmCode = () =>{
         //axios for checking on correct the confirm code will be here 
         var correct = true
         setPageData({
             codeTyped: true,
             codeCorrect: correct
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
    <div className='modalWindow' >
        
        <div className='modalWindow-dialog container dashboard__block container profile' >
        <div className="form " autoComplete="off">
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
                  <button className="btn" type="button" onClick={props.closeSaveAction} disabled={!pageData.passoworsMatch}  ><span className="btn__text">Change password</span>
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
    </div>
    )
}
export default ModalWindow