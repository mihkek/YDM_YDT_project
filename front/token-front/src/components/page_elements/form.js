import PageTitle from "../library/pageTitle"

const Form = (props) =>{
    /*
        Props
        1. FormTitle
        2. FormButtonText
        3. Email
        4. Password
        5. OnChangeAction
        6. OnSubmitAction
        7. HasError
        8. Footer - html code for footer of the form
     */
    return(
        <div className="signup">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-xl-4">
              <PageTitle text={props.formTitle} className="h2 signup__header"/>
                <div className="signup__body">
                   {props.hasError && <h2 className="error-message">Error message</h2>}
                  <div className="form" >
                    <div className="form__item">
                      <label>Email</label>
                     
                      <input type="text" name="email" value={props.email} onChange={props.OnChangeAction}/>
                    </div>
                    <div className="form__item">
                      <label>Password</label>
                      <input type="text" name="password" value={props.password} onChange={props.OnChangeAction}/>
                    </div>
                    <div className="form__item center">
                            <button className="btn" type="button" onClick={props.OnSubmitAction}><span className="btn__text">{props.formButtonText}</span>
                            </button>
                    </div>
                  </div>
                  <div className="signup__footer">
                    {props.footer}
                 
                </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
    )
}
export default Form