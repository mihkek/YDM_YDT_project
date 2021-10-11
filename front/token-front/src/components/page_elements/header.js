import Logo from "../library/logo"
import AppNavBar from "../library/appNavBar"
import  './static/css/style.css'
const Header = () =>{
    return(
        <header class="header">
            <div class="container">
                    <div class="row justify-content-between align-items-center">
                           <Logo/>
                           <AppNavBar/>
                    </div>
                </div>
          </header>
    )
}