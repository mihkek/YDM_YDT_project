import PageTitle from "../components/library/pageTitle";
import DashboardList from "../components/page_elements/dashboardList";
import Hint  from "../components/library/hint";
import SimpleWidget from "../components/page_elements/simpleWidget";
import DashboardForm from "../components/page_elements/dashboardForm";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

const Dashboard = () =>{
    const [pageData, setPageData] = useState({
         ydBalance: 10,
         ydmBalance: 20,
         dailyRoi: 100,
         weeklyRoi: 120,
         allTimeRoi: 200,
         tokensEarned: 12,
         referalLink: "dsf@fsdf",
         wallet: "test.tte.st",
         
         isWalletEdit: false,
         referalLinkCopyed: false
    })
    const textAreaRef = useRef(null);
    const logied = useSelector(state => state.logied);
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
    const walletSave = () =>{
        //axios for save new withdrawal wallet
        alert("wallet save")
    }
    const walletEdit = () =>{
        setPageData({
            ...pageData,
            isWalletEdit: !pageData.isWalletEdit
        })
    }
   var buttonText = pageData.isWalletEdit ? "Cancel" : "Edit"
   var copyButtonText = pageData.referalLinkCopyed ? "Copyed!" : "Copy"
    return(
        <div className="dashboard">
           <div className="container">
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
                                    {text: "Current rate 500$=1YDM"},
                                    {text: "1 YDM grants X YD Token"}
                                ]}
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
                                    {action: walletSave, text: "Save"}
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
                                formFooter_value= "1000"
                                input = {<input type="text" className="readonly_input"  ref={textAreaRef} name="referalLink" readOnly={true} value={pageData.referalLink}></input>} 
                            />
                           
                    </div>
                </div>
           </div>
        </div>
    )
} 
export default Dashboard