
import React from "react"

const PageTitle = (props) =>{
    console.log(props)
    return(
        <h1 className={props.className}>{props.text}</h1>
    )
}
export default PageTitle