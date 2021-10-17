import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import Loader from "../components/library/loader";
import { Link } from "react-router-dom";

const ByeForm = (props) => {
    const logied = useSelector(state => state.logied);

    const [pageData, setPageData] = useState({
        tokenCount: 0,
        isLoad: false
    })
    const onChangeFormValueAction = e => {
        setPageData({
               ...pageData,
               [e.target.name]: e.target.value
             });
    };
    const readyToBye = () =>{
        //axios for start pay procedure will be here
        alert("Bye - " + pageData.tokenCount)
        return(<Redirect to="/dashboard"/>)
    }

    return(
        <div className='modalWindow' >
      
        {!logied && <Redirect to="/login"/>}
        <div className='modalWindow-dialog container dashboard__block container profile' >
        <div className="form " autoComplete="off">
        {pageData.isLoad && <Loader additional="loader-local"/>}
          <React.Fragment>
            <div className="widget-form__header widget-form__header--center">
                <h5 className="center_text small_text">Enter the number of tokens, that you wanna bye here</h5>
            </div>
                <div className="signup body">
                        <input autoComplete="off" type="number"  name="confirmCode" value={pageData.confirmCode} onChange={onChangeFormValueAction} /> 

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