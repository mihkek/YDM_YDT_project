import { Injectable } from '@nestjs/common';
import Coinpayments from 'coinpayments';
import { numberMultiplyNumber } from 'src/functions/calc';

const merchant_config = require('./merchant-config.json')
const configs = require('../../config.json')


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
    async createTransaction_YDM(buyerName:string, buyerEmail:string, count:number, coinName:string="LTCT"){
        if(this.coinpaymentsClient == undefined)
            throw new Error("Coinpayments client is not valid") 

        var sumToPay = numberMultiplyNumber(configs.YDM_RATE, count)
        var transaction = await this.coinpaymentsClient.createTransaction({
                                    currency1: "USD", 
                                    currency2: coinName, 
                                    amount: sumToPay, 
                                    buyer_email: buyerEmail,//"mihkek991@gmail.com", 
                                    buyer_name: buyerName,
                                    item_name: "YDM"})
                                    
        return transaction
    }
    async getTransactionInfo(transactionId:string){
        if(this.coinpaymentsClient == undefined)
            throw new Error("Coinpayments client is not valid") 
        var transactionInfo = await this.coinpaymentsClient.getTx({txid: transactionId, full: 1})

        return transactionInfo
    }
}