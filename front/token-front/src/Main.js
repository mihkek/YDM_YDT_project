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
import { useState } from "react";
import {login, logout, signup_confirm}  from './state_container/actions'
import MessageWithButton from "./components/page_elements/messageWithButton";
import * as Convert from './static/functions/convert'
import Loader from "./components/library/loader";
import ByeForm from "./pages/buy";
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
  logout,
  signup_confirm
};

export const Main = () =>{

  const [userData, setUserData] = useState({
    login: '',
    showByeWindow: false
 })
  const dispatch = useDispatch();
  const logied = useSelector(state => state.logied)

  const try_logout = () =>{
    dispatch(logout())
    return( <Redirect to="/"/>)
  }

  const try_signup_confirm = (props) =>{
     //get data from request will be here
     const params = new URLSearchParams(props.location.search);
     var error = Convert.fromStringToBoolean(params.get("error"));
     var message = params.get("message")
     dispatch(signup_confirm())
     if(error) 
        return(
          <MessageWithButton
              title="Error into sign in"
              message={message}
              buttonLink="/"
              buttonText="Go back"
          /> 
        )
      else
          var log=params.get('log')
          setUserData({
            login: log
          })
          return(
              <Redirect to="/login"
                />
          )
  }
      const byeAction = () =>{
          setUserData({
            showByeWindow: !userData.showByeWindow
          })
      }
      return(
    <body >
        <div className="wrapper">
            <PageHeader />
            <div className="main">
               <Switch>
                   <Route
                        exact 
                        path="/signup"
                        render={props => <SignUp   {...props} />}
                    />
                    <Route   
                        path="/signup_confirm"
                        component={try_signup_confirm}
                    />
                    <Route
                        exact 
                        path="/dashboard"
                        render={props => <Dashboard     {...props} />}
                    />
                     <Route 
                        path="/login"
                        render={props => <SignIn  login={userData.login}   {...props} />}
                    />
                    <Route
                       exact
                       path="/"
                       render= {props =><StartPage {...props} />}
                      />
                      <Route
                       exact
                       path="/bye"
                       render= {props =><ByeForm {...props} />}
                      />
                    <Route
                       exact
                       path="/profile"
                       component ={ProfilePage}
                      />
                    <Route
                      exact
                      path="/logout"
                      render={try_logout}
                    />
                </Switch>
                 {/* <ByeForm closeAction = {byeAction}/> */}
              </div>
            {logied && <Footer items={Menues.FooterMenu} brand="© 2020 YDRAGON"/>}
        </div>
    </body>
         
      )
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);