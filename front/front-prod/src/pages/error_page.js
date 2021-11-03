const ErrorPage = (props) =>{
    /*
        props
        1. Title
        2. Message
        3. ButtonLink
        4. ButtonText
    */
   return(
    <div className="signup">
    <div className="dashboard__block">
              <h2 className="widget__title center_text">{props.title}</h2>
               <p className="center_text">{props.message}</p>
               <div className="form__item center">
                            <Link to={props.buttonLink}><button className="btn" type="button" ><span className="btn__text">{props.buttonText}</span>
                            </button></Link>
                    </div>
        </div>
    </div>
   )
}   
export default ErrorPage