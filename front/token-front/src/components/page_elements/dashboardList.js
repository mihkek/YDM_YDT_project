import React from "react"

const DashboardList = (props) =>{
    /*
        Props:
        1. Items(list). Contain: text
        2. WarningItems(list). Contain: text. Uses for show some warning messages for user
        2. BlockClass(not require)
        3. ListClass(not require)
        4. ListHeader
    */
    return(
            <div className={props.blockClass}>
            <div className={props.listClass}>
                {props.listHeader != undefined &&  <h2>{props.listHeader}</h2>}
                {props.items.map(e =>
                    <p>{e.text}</p>    
                )}
                {props.warningItems != undefined && props.warningItems.map(e =>
                    <React.Fragment>
                        <div className="down_message">{e.text}</div>
                        {e.link != undefined && e.link}
                    </React.Fragment>
                     
                )}
            </div>
            </div>
    )
}
DashboardList.defaultProps ={
    blockClass: "col-12 col-md-6",
    listClass: "dashboard__list"
}
export default DashboardList