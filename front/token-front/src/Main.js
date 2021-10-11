import React from "react";
import SignUp from './pages/sign_up'
import PageHeader from "./components/page_elements/pageHeader";
import  './static/css/style.css'
import Footer from "./components/page_elements/footer";
import {FooterMenu} from './configs/components/footerMenu'

const Main = () =>{
      return(
    <body class="body-pages">
        <div class="wrapper">
            <PageHeader/>
            <SignUp/>
            <Footer items={FooterMenu} brand="© 2020 YDRAGON"/>
        </div>
    </body>
         
      )
}
export default Main