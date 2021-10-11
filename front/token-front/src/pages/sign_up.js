import React from "react";
import PageTitle from "../components/library/pageTitle";
import Form from "../components/page_elements/form";
const SignUp = () =>{
    return(
      <div className="main">
         <div className="signup">
           <div className="container">
              <Form
                formTitle="Sign up"
                formButtonText = "Create a new account" 
                footer = { <p>You Already have an account <a href="/api/login">Login Here</a></p>} 
              />
            </div>
          </div>
      </div>
    )
}
export default SignUp