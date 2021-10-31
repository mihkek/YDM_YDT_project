import PageTitle from "../components/library/pageTitle";
import DashboardList from "../components/page_elements/dashboardList";
import Hint  from "../components/library/hint";
import SimpleWidget from "../components/page_elements/simpleWidget";
import DashboardForm from "../components/page_elements/dashboardForm";
import axios from "axios";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Loader from "../components/library/loader";
import ErrorMessage from "../components/library/error-message";
import { set_active_transaction } from "../state_container/actions";
import ModalMessage from "../components/library/modal_message";

const Dashboard = () =>{
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userId);
    const token = useSelector(state => state.token);
    const currentRate = useSelector(state => state.currentRate); 
    const hasActiveTransaction = useSelector(state => state.hasActiveTransaction)

    const [pageData, setPageData] = useState({
         ydBalance: 0,
         ydmBalance: 0,
         dailyRoi: 0,
         weeklyRoi: 0,
         allTimeRoi: 0,
         tokensEarned:0,
         referalLink: "",
         wallet: "",
         
         isWalletEdit: false,
         referalLinkCopyed: false,
         isLoading: false,
         activeTransactionPayAdress: '',
         hasReadyTransaction: false,
         transactionMessage: ''
    })
    const textAreaRef = useRef(null);
    const logied = useSelector(state => state.logied);

    useEffect(() => {
        setPageData({
            ...pageData,
            isLoading: true
          })
          axios({
            method: 'post', 
            url: 'api/private/user_dashboard', 
            secure: true,
            headers: {},
            data: {
                "userId": userId,
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
                            ydBalance: response.data.balance.YDT_balance,
                            ydmBalance: response.data.balance.YDM_balance,
                            dailyRoi: response.data.balance.CurrentDailyRoi,
                            weeklyRoi: response.data.balance.WeeklyRoi,
                            allTimeRoi: response.data.balance.AllTimeRoi,
                            tokensEarned:response.data.referalLink.earns,
                            referalLink: response.data.referalLink_link.link,
                            wallet: response.data.user.wallet,
                            activeTransactionPayAdress: response.data.transactionPayAdress,
                            hasReadyTransaction: response.data.hasReadyTransaction,
                            transactionMessage: response.data.transactionMessage
                    })
                    dispatch(set_active_transaction({
                        hasActiveTransaction: response.data.hasActiveTransaction
                    }))
                    // if(response.data.hasActiveTransaction){
                    //       setPageData({
                    //         ...pageData,
                    //         activeTransactionPayAdress: response.data.transactionPayAdress
                    //       })
                    // }
                    // if(response.data.hasReadyTransaction){
                    //     setPageData({
                    //         ...pageData,
                    //         hasReadyTransaction: true,
                    //         transactionMessage: response.data.transactionMessage
                    //     })
                    // }
                
            }
        }) 
        .catch( err=>{
            setPageData({
                ...pageData,
                isLoading: false,
                hasError: true,
                errorMessage: "Cannot do request to server. Try again later. "+err
            })
        })
    }, [])

    const saveWallet = () =>{
        setPageData({
            isLoading: true
        })
        alert(pageData.wallet)
        axios({
            method: 'post', 
            url: 'api/private/save_new_wallet', 
            secure: true,
            headers: {},
            data: {
                "userId": userId,
                "token": token,
                "wallet": pageData.wallet
            }   
        })
        .then(response=> {
            setPageData({
              ...pageData,
              isLoading:false,
              hasError: response.data.error,
              errorMessage: response.data.message
            })
        }) 
        .catch( err=>{
            setPageData({
                ...pageData,
                isLoading: false,
                hasError: true,
                errorMessage: "Cannot do request to server. Try again later. "+err
            })
        })
    }
    if(!logied){
        return(
            <Redirect to="/login"/>
        )
    }
  
    const onChangeFormValueAction = e => {
        setPageData({
               ...pageData,
               [e.target.name]: e.target.value
             });
           };
    const copyText = (e) =>{
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setPageData({
            ...pageData,
            referalLinkCopyed: true
        })
    }
    const walletEdit = () =>{
        setPageData({
            ...pageData,
            isWalletEdit: !pageData.isWalletEdit
        })
    }
    const closeModalMessage = () =>{
        setPageData({
            ...pageData,
            hasReadyTransaction: false,
            transactionMessage: ''
        })
    }
   var buttonText = pageData.isWalletEdit ? "Cancel" : "Edit"
   var copyButtonText = pageData.referalLinkCopyed ? "Copyed!" : "Copy"
    return(
        <div className="dashboard">
           <div className="container">
           {pageData.hasError && <ErrorMessage message={pageData.errorMessage}/>}
           {pageData.isLoad && <Loader additional="loader-local"/>}
           {pageData.hasReadyTransaction &&  
            <ModalMessage
                    text={pageData.transactionMessage}
                    title="Information"
                    closeAction={closeModalMessage}
            />
           }
            <div class="row">
                    <div class="col-12">
                        <PageTitle className="h2 dashboard__header" text="dashboard"/>
                    </div>
                </div>
                <div class="row">
                     <div class="col-12">
                        <div class="dashboard__block">
                            <div className="row">
                            <div class="col-12 col-lg-6">
                                <div>
                                    <div class="row">
                                        <DashboardList 
                                            items = {[
                                                {text: "Buy YDM yearn YD tokens"},
                                                {text: "Automated Yield and Liquidity Farming"},
                                                {text: "No withdraw fees"}
                                            ]}
                                        />
                                        <DashboardList 
                                            items = {[
                                                {text: "Use BTC and other crypto"},
                                                {text: "Weekly auto re-invest"},
                                                {text: "Weekly airdrops"}
                                            ]}
                                        />
                                        
                                    </div>
                                        <div class="row justify-content-between">
                                            <Hint text="YD token"/>
                                        </div>
                                 </div>
                             </div>
                             <DashboardList 
                                blockClass = "col-12 col-lg-6"
                                listClass = "dashboard__info"
                                listHeader = "Purchase YDM"
                                items = {[
                                    {text: "Current rate "+currentRate+" $=1YDM"},
                                    {text: "1 YDM grants X YD Token"},
                                ]}
                                warningItems = {hasActiveTransaction ? 
                                        [
                                            {text: "You have bought YDM tokens. Please, send coins on this adress "+pageData.activeTransactionPayAdress+ " for take your tokens!"}
                                        ] : []}
                            />
                        </div>
                   </div>
                </div>
                </div>
                <div class="row">
                     <div class="col-12">
                        <h2 class="h3">Balance</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">

                    </div>   
                </div>
                <div class="row">
                        <div class="col-12 col-md-6 col-lg-3">
                                <SimpleWidget title="YD tokens" value={pageData.ydBalance} />
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                                <SimpleWidget title="YD machines" value={pageData.ydmBalance} />
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="dashboard__block">
                              <div class="widget widget--lg">
                                <div class="row justify-content-between widget__header">
                                    <div class="col-md-auto">
                                        <div class="widget__title">Daily ROI</div>
                                        </div>
                                    <div class="col-md-auto">
                                         <div class="widget__number">{pageData.dailyRoi}</div>
                                    </div>
                                </div>
                                <div class="row justify-content-between widget__body">
                                     <SimpleWidget 
                                        title="Weekly ROI" 
                                        value={pageData.weeklyRoi}
                                        blockClass="col-md-auto"
                                        widgetClass="widget__row"
                                        titleClass=""
                                        valueClass=""
                                     />
                                      <SimpleWidget 
                                        title="All time ROI" 
                                        value={pageData.allTimeRoi}
                                        blockClass="col-md-auto"
                                        widgetClass="widget__row"
                                        titleClass=""
                                        valueClass=""
                                     />
                                </div>
                            </div>
                          </div>
                        </div>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6">
                            <DashboardForm
                                formLabel= "Wallet for withdrawal"
                                buttons = {[
                                    {action: walletEdit, text: buttonText},
                                    {action: saveWallet, text: "Save"}
                                ]}
                                header = {undefined}
                                formFooter_header= "Info"
                                formFooter_value= "Info about it will be here in the future"
                                input = {<input type="text" name="wallet" onChange={onChangeFormValueAction} value={pageData.wallet} readOnly={!pageData.isWalletEdit}></input>} 
                            />
                    </div>
                    <div class="col-12 col-lg-6">
                        
                            <DashboardForm
                                formLabel= "Referal link"
                                buttons = {[
                                    {action: copyText, text: copyButtonText}
                                ]}
                                header = "Share and earn YD tokens" 
                                formFooter_header= "YD tokens earned:"
                                formFooter_value= {pageData.tokensEarned}
                                input = {<input type="text" className="readonly_input"  ref={textAreaRef} name="referalLink" readOnly={true} value={pageData.referalLink}></input>} 
                            />
                           
                    </div>
                </div>
           </div>
        </div>
    )
} 
export default Dashboard