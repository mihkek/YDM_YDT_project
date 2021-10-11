
import logo from '../../static/images/logo.svg'

const Logo = () =>{
    return(
        <div className="col-12 col-md-1">
            <div className="header__logo"><a className="logo" href="/">
                <picture className="logo__picture"><img src={logo} alt="Logo"/></picture></a>
            </div>
      </div>
        
    )
}
export default  Logo