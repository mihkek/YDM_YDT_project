import React from "react"

const ModalMessage = (props) =>{
    /*Props
        1. Text
        2. Title
        3. CloseAction
    */
    return(
        <div className='modalWindow' >
        <div className='modalWindow-dialog container dashboard__block container profile' >
        <div className="form " autoComplete="off">
          <React.Fragment>
            <div className="widget-form__header widget-form__header--center ">
               
            </div>
                <div className="signup body">
                       

                        <div className="form__item center modal_message">
                            <h1 className="center_text">{props.title}</h1>
                            <p>{props.text}</p>
                          <center> 
                                <button className="btn butCenter" onClick={props.closeAction} type="button" ><span className="btn__text ">Ok</span>
                            </button>
                            
                        </center>
                        </div>
                    </div>
               
            </React.Fragment>
             </div>
            </div>
         </div>
    )
}
export default ModalMessage