import React from "react";
import Form from "../components/page_elements/form";
const SignUp = () =>{
    return(
    
         <div className="signup">
           <div className="container">
              <Form
                formTitle="Sign up"
                formButtonText = "Create a new account" 
                footer = { <p>You Already have an account <a href="/api/login">Login Here</a></p>} 
              />
            </div>
      </div>
    )
}
export default SignUp