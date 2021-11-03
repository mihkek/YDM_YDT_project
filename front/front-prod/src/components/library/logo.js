
import { Link } from 'react-router-dom'
import logo from '../../static/images/logo.svg'

const Logo = () =>{
    return(
        <div className="col-12 col-md-1">
            <div className="header__logo"><Link to="/"> <a className="logo">
                <picture className="logo__picture"><img src={logo} alt="Logo"/></picture></a></Link>
            </div>
      </div>
        
    )
}
export default  Logo