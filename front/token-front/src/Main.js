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
import { useEffect } from "react";
import {login, logout, signup_confirm, get_initial_data}  from './state_container/actions'
import MessageWithButton from "./components/page_elements/messageWithButton";
import * as Convert from './static/functions/convert'
import Loader from "./components/library/loader";
import ErrorMessage from "./components/library/error-message";
import CheckReferalPage from "./pages/check_referal_page";
import axios from "axios";

import ByeForm from "./pages/buy";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import InfoPayment from "./pages/payment";


function mapStateToProps(state) {
  return {
    logied: state.logied,
    token: state.token,
    currentRate: state.currentRate,
    userId: state.userId
  };
}
const mapDispatchToProps = {
  login,
  logout,
  signup_confirm,
  get_initial_data
};

export const Main = () =>{

  const [pageData, setPageData] = useState({
    login: '',
    isLoad: false
 })
  const dispatch = useDispatch();
  const logied = useSelector(state => state.logied)

  useEffect(() =>{
    axios({
      method: 'post', 
      url: 'api/public/get_base_data',
      secure: true,
      headers: {},
      data: {
      }
  })
  .then(response=> {
      setPageData({
        ...pageData,
        isLoad:false,
        hasError: response.data.error,
        errorMessage: response.data.message
      })
      if(!response.data.error){
         dispatch(get_initial_data({
           currentRate: response.data.currentRate
         }))
      }
  }) 
  .catch( err=>{
      setPageData({
          ...pageData,
          isLoad: false,
          hasError: true,
          errorMessage: "Cannot do request to server. Try again later. "+err
      })
  })
  }, [])
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
          setPageData({
            login: log
          })
          return(
              <Redirect to="/login"
                />
          )
  }
      const byeAction = () =>{
          setPageData({
            showByeWindow: !pageData.showByeWindow
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
                              path="/info_payment"
                              render={props => <InfoPayment   {...props} />}
                          />
                          <Route
                              exact 
                              path="/dashboard"
                              render={props => <Dashboard     {...props} />}
                          />
                           <Route
                              exact 
                              path="/signup_referal"
                              render={props => <CheckReferalPage     {...props} />}
                          />
                          <Route 
                              path="/login"
                              render={props => <SignIn  login={pageData.login}   {...props} />}
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
                    </div>
              </div>
          </body>
         
      )
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);