import React from "react";
import SignUp from './pages/sign_up'
import PageHeader from "./components/page_elements/pageHeader";
import  './static/css/style.css'
import Footer from "./components/page_elements/footer";
import * as Menues from './configs/components/footerMenu'
import Dashboard from "./pages/dashboard";


const Main = () =>{
      return(
    <body >
        <div className="wrapper">
            <PageHeader/>
            <div className="main">
                {/* <SignUp/> */}
                <Dashboard />
              </div>
            <Footer items={Menues.FooterMenu} brand="© 2020 YDRAGON"/>
        </div>
    </body>
         
      )
}
export default Main