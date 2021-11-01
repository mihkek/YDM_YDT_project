import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import Loader from "../components/library/loader";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/library/error-message";
import axios from "axios";
import InputForm from "../components/library/input_form";
import { set_active_transaction } from "../state_container/actions";

const ByeForm = (props) => {
    const logied = useSelector(state => state.logied);
    const userId = useSelector(state => state.userId);
    const token = useSelector(state => state.token);
    const hasActiveTransaction = useSelector(state => state.hasActiveTransaction)
    const dispatch = useDispatch()

    const [pageData, setPageData] = useState({
        tokenCount: 0,
        isLoad: false,
        hasError: false,
        errorMessage: '',
        actualCoins: [],
        selectedCoin: ''
    })
    useEffect(()=>{

        setPageData({
            ...pageData,
            isLoad: true
          })
          axios({
            method: 'post', 
            url: 'api/public/get_actual_coins_for_pay', 
            secure: true,
            headers: {},
            data: {
                "token": token,
            }   
        }) 
        .then(response=> {
            setPageData({
              ...pageData,
              isLoading:false,
              hasError: response.data.error,
              errorMessage: response.data.message
            })
            if(!response.data.error){
                    setPageData({
                            ...pageData,
                           actualCoins: Object.keys(response.data.coins)
                    })
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
    const readyToBye = () =>{
        setPageData({
            ...pageData,
            isLoad: true
        })
        axios({
            method: 'post', 
            url: 'api/private/bye-ydm', 
            secure: true,
            headers: {},
            data: {
                "userId" : userId,
                "count" : pageData.tokenCount,
                "coin": pageData.selectedCoin,
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
            if(!response.data.error){
                    dispatch(set_active_transaction({
                        hasActiveTransaction: true,
                        activeTransactionId: response.data.transactionId,
                        activeTransactionPayAdress: response.data.transactionPayAdress
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
       if(!pageData.hasError) 
            return(<Redirect to="/dashboard"/>)
    }

    const onChangeFormValueAction = e => {
        setPageData({
               ...pageData,
               [e.target.name]: e.target.value
             });
    };

    var rates = (<select value={pageData.selectedCoin} name="selectedCoin" onChange={onChangeFormValueAction}>
            {pageData.actualCoins != undefined && pageData.actualCoins.map(e =>
                <option value={e}>{e}</option>
            )}
        </select>)
    return(
        <React.Fragment>
            {!logied && <Redirect to="/login"/>}
            {hasActiveTransaction && <Redirect to="/dashboard" />}
            <InputForm 
                title= "Enter the number of tokens, that you wanna bye here"
                typeOfValue= "number"
                linkAfterClose= "/dashboard"
                buttonText= "Bye YDM!"
                onChangeValue = {onChangeFormValueAction}
                submitAction = {readyToBye}
                valueForInput = {pageData.tokenCount}
                nameOfInput = "tokenCount"
                hasError = {pageData.hasError}
                errorMessage = {pageData.errorMessage}
                isLoad = {pageData.isLoad}
                customInputs = {[
                   (<h5 className="center_text small_text">Select coin which you want to pay for</h5>),
                   (rates)
                ]}
            />
        </React.Fragment>
    )
}
export default ByeForm