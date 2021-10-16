const Loader = (props) =>{
    /*
      Props:
      1. Additional - a css class with additional options for loader
    */
    var classN = props.additional === undefined ? "loader" : "loader "+props.additional
    return(
        <div className="loader">
        </div>
    )
}
export default Loader