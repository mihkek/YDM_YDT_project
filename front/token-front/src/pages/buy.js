import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import Loader from "../components/library/loader";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/library/error-message";
import axios from "axios";

const ByeForm = (props) => {
    const logied = useSelector(state => state.logied);
    const userId = useSelector(state => state.userId);
    const token = useSelector(state => state.token);

    const [pageData, setPageData] = useState({
        tokenCount: 0,
        isLoad: false,
        hasError: false,
        errorMessage: ''
    })
    const onChangeFormValueAction = e => {
        setPageData({
               ...pageData,
               [e.target.name]: e.target.value
             });
    };
    const readyToBye = () =>{
        setPageData({
            ...pageData,
            isLoad: true
        })
        axios({
            method: 'post', 
            url: 'api/bye-ydm', 
            secure: true,
            headers: {},
            data: {
                "userId" : userId,
                "count" : pageData.tokenCount,
                "token": token
            }
        })
        .then(response=> {
            setPageData({
              ...pageData,
              isLoad:false,
              hasError: response.data.error,
              errorMessage: response.data.message
            })
        }) 
        .catch( err=>{
            setPageData({
                ...pageData,
                isLoad: false,
                hasError: true,
                errorMessage: "Cannot do request to server. Try again later. "+err
            })
        })
       if(!pageData.hasError) 
            return(<Redirect to="/dashboard"/>)
    }

    return(
        <div className='modalWindow' >
      
        {!logied && <Redirect to="/login"/>}
        <div className='modalWindow-dialog container dashboard__block container profile' >
        <div className="form " autoComplete="off">
        {pageData.hasError && <ErrorMessage message={pageData.errorMessage}/>}
        {pageData.isLoad && <Loader additional="loader-local"/>}
          <React.Fragment>
            <div className="widget-form__header widget-form__header--center">
                <h5 className="center_text small_text">Enter the number of tokens, that you wanna bye here</h5>
            </div>
                <div className="signup body">
                        <input autoComplete="off" type="number"  name="tokenCount" value={pageData.tokenCount} onChange={onChangeFormValueAction} /> 

                        <div className="form__item center">
                          <center> 
                                <button className="btn butCenter" onClick={readyToBye} type="button" ><span className="btn__text ">Bye YDM!</span>
                            </button>
                            
                        </center>
                        </div>
                    </div>
               
            </React.Fragment>
             </div>
            </div>
            <div class="cl-btn-2">
            <Link to="/dashboard"><div>
                    <div class="leftright"></div>
                    <div class="rightleft"></div>
                     <span class="close-btn">закрыть</span> 
                </div></Link>
          </div>
         </div>
    )
}
export default ByeForm