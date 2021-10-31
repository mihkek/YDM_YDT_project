import Loader from "./loader"
import ErrorMessage from "./error-message"
import { Link } from "react-router-dom"
import React from "react"

const InputForm = (props) =>{
    /* Props
        1.Title
        2.ValueForInput
        3.TypeOfValue (default - text)
        4.OnValueChange
        5.SubmitAction
        6.LinkAfterClose
        7.HasError
        8.ErrorMessage
        9.IsLoad
        10.ButtonText
        11.nameOfInput
        12.showAfterSubmit
    */
    return(
        <div className='modalWindow' >
        <div className='modalWindow-dialog container dashboard__block container profile' >
        <div className="form " autoComplete="off">
        {props.hasError && <ErrorMessage message={props.errorMessage}/>}
        {props.isLoad && <Loader additional="loader-local"/>}
          <React.Fragment>
            <div className="widget-form__header widget-form__header--center">
                <h5 className="center_text small_text">{props.title}</h5>
            </div>
                <div className="signup body">
                        <input autoComplete="off" type={props.typeOfValue}  name={props.nameOfInput} value={props.valueForInput} onChange={props.onChangeValue} /> 

                        <div className="form__item center">
                          <center> 
                                <button className="btn butCenter" onClick={props.submitAction} type="button" ><span className="btn__text ">{props.buttonText}</span>
                            </button>
                            
                        </center>
                        </div>
                    </div>
               
            </React.Fragment>
             </div>
            </div>
            <div class="cl-btn-2">
            <Link to={props.linkAfterClose}><div>
                    <div class="leftright"></div>
                    <div class="rightleft"></div>
                     <span class="close-btn">Close</span> 
                </div></Link>
          </div>
          
         </div>
    )
}
InputForm.defaultProps = {
    title: "Input value",
    typeOfValue: "text",
    linkAfterClose: "/",
    buttonText: "Ok"
    
  };
export default InputForm