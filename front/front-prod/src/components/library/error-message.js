export const ErrorMessage = (props) =>{
    return(
        <center><h2 className="error-message">{props.message}</h2></center>
    )
}
export const SuccessMessage = (props) => {
    return(
        <center><h2 className="success-message">{props.message}</h2></center>
    )
}
export default ErrorMessage