import { Injectable } from '@nestjs/common';
import Coinpayments from 'coinpayments';

const merchant_config = require('./merchant-config.json')


@Injectable()
export class PaymentsService {
    private coinpaymentsClient: Coinpayments
    
    constructor(){ 
        this.coinpaymentsClient = new Coinpayments({
                                    key: merchant_config.MERCHANT_PUBLIC_COINPAYMENTS_API_KEY, 
                                    secret: merchant_config.MERCHANT_PRIVATE_COINPAYMENTS_API_KEY})
    }
    async getMerchantAccountInfo(){
        if(this.coinpaymentsClient == undefined)
            throw new Error("Coinpayments client is not valid") 
        return this.coinpaymentsClient.getBasicInfo()
    }
    async getRate(all = true, coinName = ""){
        if(this.coinpaymentsClient == undefined)
            throw new Error("Coinpayments client is not valid") 
        const rates = await this.coinpaymentsClient.rates({short: 0, accepted: 2})

        if(all)  return rates 
        return rates[coinName]
    }
    async getMerchantBalance(all = true, coinName = ""){
        if(this.coinpaymentsClient == undefined)
            throw new Error("Coinpayments client is not valid") 
        const balances = await this.coinpaymentsClient.balances({all: 0})

        if(all) return balances
        return balances[coinName]
    }
    async createTransaction_YDM(buyerName, buyerEmail, count){
        if(this.coinpaymentsClient == undefined)
            throw new Error("Coinpayments client is not valid") 
        //var transaction = await this.coinpaymentsClient.createTransaction({})
    }
}