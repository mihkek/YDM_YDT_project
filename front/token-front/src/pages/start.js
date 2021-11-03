import PageTitle from "../components/library/pageTitle"
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
 import Loader from "../components/library/loader";
const StartPage = () =>{
  const logied = useSelector(state => state.logied);
  const currentRate = useSelector(state => state.currentRate);
  if(logied){
      return(
          <Redirect to="/dashboard"/>
      )
  }
    return(
        <main class="main">
        <div class="dashboard">
          <div class="container">
            <div class="row">
            
                <PageTitle
                    className="h2 signup__header"
                    text="YD Dragon"
                />
            </div>
            <div class="row">
              <div class="col-12">
                <div class="dashboard__block">
                  <div class="row">
                    <div class="col-12 col-lg-6">
                      <div>
                        <div class="row">
                          <div class="col-12 col-md-6">
                            <ul class="dashboard__list">
                              <li>Buy YDM yearn YD tokens</li>
                              <li>Automated Yield and Liquidity Farming</li>
                              <li>No withdraw fees</li>
                            </ul>
                          </div>
                          <div class="col-12 col-md-6">
                            <ul class="dashboard__list">
                              <li>Use BTC and other crypto</li>
                              <li>Weekly auto re-invest</li>
                              <li>Weekly airdrops</li>
                            </ul>
                          </div>
                        </div><br/>
                        <div class="row justify-content-between">
                          <div class="col-md-auto">
                            <p>YD Tokens</p>
                          </div>
                          <div class="col-md-auto">
                            <p><a href="#">More </a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6">
                      <div class="dashboard__info">
                        <h2>Purchase YDM</h2>
                        <p>Current rate {currentRate}=1YDM</p>
                        <p>1 YDM grants X YD Token</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </main>
    )
}
export default StartPage