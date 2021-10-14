import React, { useEffect, useState } from "react"
const ModalWindow = (props) =>{
    /*
        Props
        1. CloseAction
        2. CloseSaveAction
        
    */
    const [pageData, setPageData] = useState({
        confirmCode: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        passoworsMatch: false,
        codeTyped: true,
        codeCorrect: true
    })
    useEffect(() => {
        var res =  pageData.password === pageData.confirmPassword ? true : false,   
        
      })
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
    var passowordInputType = pageData.showPassword ? "text" : "password"
    var passowordConfirmInputType = pageData.showConfirmPassword ? "text" : "password"
    return(
    <div className='modalWindow' >
        <div className='modalWindow-dialog container dashboard__block container profile' >
        <div className="form " autoComplete="off">
        {!pageData.codeTyped ? 
          <React.Fragment>
            <div className="widget-form__header widget-form__header--center">
                <h5 className="center_text small_text">The confirm code sent to you email. Check it and type this code here</h5>
            </div>
            
                <div className="widget-form__form">
                        <input autoComplete="off" type="text"  name="password" /> 
                            <div>
                            <button className="btn butSmall butShowHide" type="button" ><span className="btn__text ">Ok</span>
                            </button>
                        </div>
                    </div>
               
            </React.Fragment>
            :
                pageData.codeCorrect ? 
                 <div className="form " autoComplete="off">
                    {pageData.passoworsMatch === false &&  <center><h2 className="error-message">Passwords do not match!</h2></center>}
                 <h3>Password</h3>
                <div className="widget-form__form">
                    <div className="row">
                        <input autoComplete="off" type={passowordInputType}  name="password" value={pageData.password} onChange={onPasswordsChange}/> 
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
                        <input autoComplete="off" type={passowordConfirmInputType}  name="confirmPassword" value={pageData.confirmPassword} onChange={onPasswordsChange}/> 
                        <div>  
                                <button className="btn butSmall butShowHide" type="button" onClick={showHideConfirmPassword}><span className="btn__text ">Show</span>
                                </button>     
                        </div>
                      </div>
                  </div>
                  <br/>
                  <div className="widget-form__form">
                  <button className="btn" type="button" ><span className="btn__text">Change password</span>
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