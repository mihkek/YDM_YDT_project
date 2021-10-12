import PageTitle from "../components/library/pageTitle";
import DashboardList from "../components/page_elements/dashboardList";
import Hint  from "../components/library/hint";
import SimpleWidget from "../components/page_elements/simpleWidget";


const Dashboard = () =>{
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
                                <SimpleWidget title="YD tokens" value="1000" />
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                                <SimpleWidget title="YD machines" value="1000" />
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="dashboard__block">
                              <div class="widget widget--lg">
                                <div class="row justify-content-between widget__header">
                                    <div class="col-md-auto">
                                        <div class="widget__title">Daily ROI</div>
                                        </div>
                                    <div class="col-md-auto">
                                         <div class="widget__number">1000</div>
                                    </div>
                                </div>
                                <div class="row justify-content-between widget__body">
                                     <SimpleWidget 
                                        title="Weekly ROI" 
                                        value="1000"
                                        blockClass="col-md-auto"
                                        widgetClass="widget__row"
                                        titleClass=""
                                        valueClass=""
                                     />
                                      <SimpleWidget 
                                        title="All time ROI" 
                                        value="1000"
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
                    </div>
                    <div class="col-12 col-lg-6">
                    </div>
                </div>
           </div>
        </div>
    )
} 
export default Dashboard