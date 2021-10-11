const AppNavBar = () =>{
    //I will use Redux. If logied property in the redux container 
    //will be "true" - nav-bar must to contain "Buy UDM", "Security", "Log Out"
    //else, nav-bar must to contain "Login", "Sign Up" 
    
    return(
        <div class="col-12 col-md-5">
            <div class="header__actions"><a class="btn btn--flat" href="#" role="button">
                <span class="btn__text">Login</span></a><a class="btn btn--outline" href="#" role="button">
                <span class="btn__text">Sign Up</span></a>
            </div>
      </div>
    )
} 
export default AppNavBar