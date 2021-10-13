import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/page_elements/form";

const SignIn = () =>{
    return(
    
         <div className="signup">
           <div className="container">
              <Form
                formTitle="Sign in"
                formButtonText = "Login" 
                footer = { <p>You have not an account? <Link to="signup"> <a>Sign up here!</a></Link></p>} 
              />
            </div>
      </div>
    )
}
export default SignIn