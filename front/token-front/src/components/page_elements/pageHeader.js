
import Logo from "../library/logo"
import AppNavBar from "../library/appNavBar"
import * as Menues from  '../../configs/components/footerMenu'

const PageHeader = (props) =>{
    return(
        <header class="header">
        <div class="container">
                <div class="row justify-content-between align-items-center">
                       <Logo/>
                       <AppNavBar menu={Menues.NotLoginNav}/>
                </div>
            </div>
      </header>
    )
}
export default  PageHeader