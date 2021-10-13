import React from "react"

const DashboardForm = (props) =>{
    /*
        Props
        1. FormLabel - text for label over the input
        2. Buttons(list) - buttons for form actions. Every element contains: text, action
        3. Header - form header
        4. FormFooter_header
        5. FormFooter_value
        6. Input - custom code for input field. It must be "custom" because in different form - different property name, binding value 
    */
    return(
        <div className="dashboard__block">
        <div className="widget-form">
          <div className="widget-form__header widget-form__header--center">
            <h3>{props.header}</h3>
          </div>
          <h4>{props.formLabel}</h4>
          <form className="widget-form__form">
            {props.input == undefined ? <input type="text" name="text" value=""/> : props.input }

            <div>
                {props.buttons.map(e => 
                    <React.Fragment>
                        <button className="btn" type="button" onClick={e.action}><span className="btn__text">{e.text}</span>
                        </button><span>    </span>
                    </React.Fragment>
                )}
            </div>
          </form>
          <div className="widget-form__bottom">
            <div className="row">
              <h4 className="col-md-auto">{props.formFooter_header}</h4>
              <div className="col-md-auto">{props.formFooter_value}</div>
            </div>
          </div>
        </div>
      </div>
    )
}
DashboardForm.defaultProps = {
    formLabel: "Form label",
    buttons: [
        {action: undefined, text: "Go!"}
    ],
    header: undefined, 
    formFooter_header: "Footer header",
    formFooter_value: "Footer value",
    inpur: undefined
}
export default DashboardForm
