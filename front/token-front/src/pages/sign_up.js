import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/page_elements/form";
import MessageWithButton from "../components/page_elements/messageWithButton";
const SignUp = () =>{
    return(
    
         <div className="signup">
           <div className="container">
            <MessageWithButton
                title="Confirm-message sent to your email!"
                message="Check your email. A letter from our cite will have title 'YD Dragon'"
                buttonLink="/"
                buttonText="Go back"
            />
              <Form
                formTitle="Sign up"
                formButtonText = "Create a new account" 
                footer = { <p>You Already have an account <Link to="/login"> <a>Login Here</a></Link></p>} 
              />
            </div>
      </div>
    )
}
export default SignUp