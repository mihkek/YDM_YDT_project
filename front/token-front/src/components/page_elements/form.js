import PageTitle from "../library/pageTitle"
import Loader from "../library/loader"
import ErrorMessage from "../library/error-message"
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
        9. HasError 
        10. ErroMessage
        11. isLoad
     */
    return(
        <div className="signup">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-xl-4">
              <PageTitle text={props.formTitle} className="h2 signup__header"/>
              {props.isLoad && <Loader />}
                <div className="signup__body">
                   {props.hasError &&  <ErrorMessage message={props.errorMessage} /> }
                  <div className="form" >
                    <div className="form__item">
                      <label>Email</label>
                     
                      <input type="email" name="email" required={true} value={props.email} onChange={props.onChangeAction}/>
                    </div>

                    <div className="form__item">
                      <label>Password</label>
                      <input type="text" name="password" required={true} value={props.password} onChange={props.onChangeAction}/>
                    </div>
                    <div className="form__item center">
                            <button className="btn" type="button" onClick={props.onSubmitAction}><span className="btn__text">{props.formButtonText}</span>
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