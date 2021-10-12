const AppNavBar = (props) =>{
    /*
        Props:
        1. Menu(list). Element contain href and text 
    */
    
    return(
        <div class="col-12 col-md-5">
            <div class="header__actions">
                { props.menu.map(e => 
                     <a class="btn btn--flat" href={e.href} role="button"><span class="btn__text">{e.text}</span></a>
                    ) 
                }
            </div>
      </div>
    )
} 
export default AppNavBar