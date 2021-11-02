import { useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Redirect } from "react-router"
import Loader from "../components/library/loader"

const InfoPayment = (props) =>{
    const hasActiveTransaction = useSelector(state => state.hasActiveTransaction)
    const logied = useSelector(state => state.logied)
    const userId = useSelector(state => state.userId)
    const token = useSelector(state => state.token)

    const [pageData, setPageData] = useState({
         payAdress: '',
         cryptoName: '',
         countOfCrypto: '',
         countInUsd: '',
         isLoad: false
    })

    useEffect(()=>{
        setPageData({
            isLoad: true
        })
        axios({
            method: 'post', 
            url: 'api/private/get_active_transaction', 
            secure: true,
            headers: {},
            data: {
                "userId" : userId,
                "token" : token
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
                setPageData({
                    payAdress: response.data.transactionInfo.payment_address,
                    cryptoName: response.data.transactionInfo.coin,
                    countOfCrypto: response.data.transactionInfo.amountf,
                    countInUsd: response.data.transactionInfo.checkout.amountf,
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

    return( 
            <div className="info_payments">
                {pageData.isLoad && <Loader />}
                {!logied && <Redirect to="/"/> }
                <div className="dashboard__block info_payments__block">
                    <h1 className="info_payments__title">Payments</h1>
                </div>

                {hasActiveTransaction ? 
                <React.Fragment>
             
                <div className="dashboard__block info_payments__block">
                    <h1 className="info_payments__block__title">Your banking details</h1>
                    <div className="info_payments__infoblock">
                          <h4 className="info_payments__infoblock__element">You withrawal adress for make payment:</h4> 
                          <h5 className="info_payments__infoblock__element">{pageData.payAdress}</h5>
                    </div>

                    <div className="info_payments__infoblock">
                          <h4 className="info_payments__infoblock__element">Crypto coin for payment:</h4> 
                          <h5 className="info_payments__infoblock__element">{pageData.cryptoName}</h5>
                    </div>

                    <div className="info_payments__infoblock">
                          <h4 className="info_payments__infoblock__element">Count of coin:</h4> 
                          <h5 className="info_payments__infoblock__element">{pageData.countOfCrypto}</h5>
                    </div>

                    <div className="info_payments__infoblock">
                          <h4 className="info_payments__infoblock__element">Count for pay in USD:</h4> 
                          <h5 className="info_payments__infoblock__element">{pageData.countInUsd}</h5>
                    </div>

                    <div className="info_payments__infoblock">
                          <h4 className="info_payments__infoblock__element">Payments on our cite make using coinpayments - </h4> 
                          <a className="info_payments__infoblock__element info_payments__infoblock__link info-link" href="https://www.coinpayments.net"> https://www.coinpayments.net</a>
                    </div>

                </div>
                </React.Fragment>
                : 
                    <div className="dashboard__block info_payments__block">
                        <h1 className="info_payments__block__title">You have not active transaction for pay!</h1>
                    </div> 
                }
            </div>
    )
}
export default InfoPayment