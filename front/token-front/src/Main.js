import React from "react";
import SignUp from './pages/sign_up'
import PageHeader from "./components/page_elements/pageHeader";
import  './static/css/style.css'
import Footer from "./components/page_elements/footer";
import * as Menues from './configs/components/footerMenu'
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/sign_in";
import StartPage from "./pages/start";
import ProfilePage from "./pages/profile";
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout}  from './state_container/actions'
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

function mapStateToProps(state) {
  return {
    logied: state.logied,
  };
}
const mapDispatchToProps = {
  login,
  logout
};

export const Main = () =>{
  const dispatch = useDispatch();
  dispatch(login())
      return(
    <body >
        <div className="wrapper">
            <PageHeader/>
            <div className="main">
               <Switch>
                   <Route
                        exact 
                        path="/signup"
                        render={props => <SignUp   {...props} />}
                    />
                    <Route
                        exact 
                        path="/dashboard"
                        render={props => <Dashboard     {...props} />}
                    />
                     <Route
                        exact 
                        path="/login"
                        render={props => <SignIn     {...props} />}
                    />
                    <Route
                       exact
                       path="/"
                       render= {props =><StartPage {...props} />}
                      />
                    <Route
                       exact
                       path="/profile"
                       component ={ProfilePage}
                      //  render= {props =><ProfilePage {...props} />}
                      />
                </Switch>
              </div>
            <Footer items={Menues.FooterMenu} brand="© 2020 YDRAGON"/>
        </div>
    </body>
         
      )
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);