import InputForm from "../components/library/input_form"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { parseLink } from "../static/functions/parseLink"
import axios from "axios"

const CheckReferalPage = (props) =>{
    /*
        props

    */
   const [pageData, setPageData] = useState({
       hasError: false,
       referalCheked: false,
       errorMessage: '',
       referalLink: '',
   })
    const logied = useSelector(state => state.logied);

        const checkReferal = () =>{
            setPageData({
            ...pageData,
            isLoad: true
            })
            var linkDetalizate = parseLink(pageData.referalLink)
                axios({
                method: 'get', 
                url: linkDetalizate.apiPath, 
                secure: true,
                headers: {},
                params: linkDetalizate.params
            })
            .then(response=> {
                setPageData({
                    ...pageData,
                    isLoad:false,
                    hasError: response.data.error,
                    errorMessage: response.data.message,
                    referalCheked: !response.data.error,
                    refedUserId: response.data.error ? -1 : response.data.user.id ,
                    refedUserName: response.data.error ? "" : response.data.user.name,
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
        }
   
    const onChangeFormValueAction = e => {
        setPageData({
               ...pageData,
               [e.target.name]: e.target.value
             });
           };

    return(
        <React.Fragment>
            {logied && <Redirect to="/"/>}
            {pageData.referalCheked && <Redirect to={{
                    pathname: '/signup',
                    props: { byReferal: true,
                             refedUserId: pageData.refedUserId,
                             refedUserName: pageData.refedUserName }
                }}
            />}
            <InputForm 
                title= "Input your referal link here"
                typeOfValue= "text"
                linkAfterClose= "/signup"
                buttonText= "Ok"
                onChangeValue = {onChangeFormValueAction}
                submitAction = {checkReferal}
                valueForInput = {pageData.referalLink}
                nameOfInput = "referalLink"
                hasError = {pageData.hasError}
                errorMessage = {pageData.errorMessage}
                isLoad = {pageData.isLoad}
            />
        </React.Fragment>
    )
}
export default CheckReferalPage