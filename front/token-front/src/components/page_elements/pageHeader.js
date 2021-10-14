
import Logo from "../library/logo"
import AppNavBar from "../library/appNavBar"
import * as Menues from  '../../configs/components/footerMenu'
import { useSelector } from "react-redux"

const PageHeader = (props) =>{
    const logied = useSelector(state => state.logied);
    var menu = {}
    menu = logied ? Menues.LoginNav : Menues.NotLoginNav
    return(
        <header class="header">
        <div class="container">
                <div class="row justify-content-between align-items-center">
                       <Logo/>
                       <AppNavBar menu={menu}/>
                </div>
            </div>
      </header>
    )
}
export default  PageHeader