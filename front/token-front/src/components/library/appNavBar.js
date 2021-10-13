import React from "react"
import { Link } from "react-router-dom"

const AppNavBar = (props) =>{
    /*
        Props:
        1. Menu(list). Element contain href and text and isOutline(not require)
    */
    
    var itemClass = ""
    return(
        <div class="col-12 col-md-5">
            <div class="header__actions">
                { props.menu.map(e => (
                    <React.Fragment>
                         <Link to={e.href}><a  {...e.isOutline ? itemClass="btn btn--outline" : itemClass= "btn btn--flat" } className={itemClass}  role="button"><span class="btn__text">{e.text}</span></a></Link>
                     </React.Fragment>
                    )) 
                }
            </div>
      </div>
    )
} 
export default AppNavBar