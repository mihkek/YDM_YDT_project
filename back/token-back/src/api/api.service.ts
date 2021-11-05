import { Injectable } from '@nestjs/common';
import { User } from 'src/models/User';
import { Balances } from 'src/models/Balances';
import { PayTransactions } from 'src/models/PayTransactions';
import { ReferalLink } from 'src/models/ReferalLink';
import { getReferalLink } from 'src/functions/getReferalLink';
import { RefedUser } from 'src/models/refedUser';
import { Earnings } from 'src/models/Earings';
import { getConnection } from 'typeorm';
import { PaymentsService } from 'src/payments/payments.service';
import { numberMultiplyNumber, numberPlusNumber } from 'src/functions/calc';
import base_config from 'src/config/base_config';

@Injectable()
export class ApiService {
    constructor(private paymentsService:PaymentsService){}

    async getUserDataForDashboard(userId){
        try{
            var user = await User.findOne({id: userId})
            var balance = await Balances.findOne({user:user})
            var referalLink = await ReferalLink.findOne({user: user})
            var link = getReferalLink(referalLink.link)
            
            var hasActiveTransaction = false
            var hasReadyTransaction = false
            var transactionMessage = ""
            var currentTransactionStatus = 0
            var userTransaction = await PayTransactions.findOne({balance: balance})

            if((userTransaction != undefined)&&(userTransaction.count != 0)){
                var transaction = await this.paymentsService.getTransactionInfo(userTransaction.transactionCoinPaymentsId)
                console.log(transaction)
                currentTransactionStatus = transaction.status

                if(transaction.status == 0){
                    hasActiveTransaction = true
                    hasReadyTransaction = false
                }
                if((transaction.status == 1)||(transaction.status == 100)){
                    hasActiveTransaction = false
                    hasReadyTransaction = true
                    transactionMessage = "Complete payment! YDT has alredy added to your balance!"
                    balance.YDM_balance = numberPlusNumber(userTransaction.count, balance.YDM_balance)
                    await balance.save()
                }
                if(transaction.status == -1){
                    hasActiveTransaction = false
                    hasReadyTransaction = true
                    transactionMessage = "Payment was not success. Money will be return to your coinpayments wallet. Fuchnatally, you did not send payment in control time. Try again later"
                }
                if(transaction.status != 0){
                    PayTransactions.delete({balance: balance})
                }
            }
            return {
                error: false,
                balance: balance,
                user: user,
                referalLink_link: link,
                referalLink: referalLink,
                hasActiveTransaction: hasActiveTransaction,
                hasReadyTransaction: hasReadyTransaction,
                transactionMessage: transactionMessage,
                transactionPayAdress: userTransaction != undefined ? userTransaction.payAdressId : '', 
                activeTransactionStatus: currentTransactionStatus
            }
        }catch(error){
            return {
                error: true,
                message: error.toString()
            }
        }
    }

    async getCurrentUserTransactionInfo(userId){
        try{
            const user = await User.findOne({id:userId})
            const balance = await Balances.findOne({user: user})
            const transaction = await PayTransactions.findOne({balance:balance})
            const transactionInfo = await this.paymentsService.getTransactionInfo(transaction.transactionCoinPaymentsId)
            
            return{
                error: false,
                transactionInfo: transactionInfo
            }
        }
        catch(err){
            return{
                error: true,
                message: err.toString()
            }
        }
    }
    async chagneUserWallet(userId, wallet){
        try{
            var user = await User.findOne({id:userId})
            user.wallet = wallet
            await user.save()
            return{
                error: false
            }
        }catch(error){
            return{
                error: true,
                message: error.toString()
            }
        }
    }
    async start_byeYMD(userId, count, coin){
        var result
        try {
            var user = await User.findOne({id: userId})
            var balance = await Balances.findOne({user: user})

            if(!balance)
                throw new Error("Cannot find data about user with this ID. Try some another ID");
                
            var checkTransaction = await PayTransactions.findOne({balance: balance})

            if(checkTransaction != undefined)
                throw new Error("You already have active transaction. After this transaction will be done, you can bye YDM");

             var createdTransaction = await this.paymentsService.createTransaction_YDM(user.name, user.email, count, coin)

             if(createdTransaction == undefined)
                  throw new Error("Cannot create pay-transaction using coinpayments. Try again later")

             var transaction = new PayTransactions()
             transaction.balance = balance
             transaction.count = count
             transaction.transactionCoinPaymentsId = createdTransaction.txn_id
             transaction.payAdressId = createdTransaction.address

             await transaction.save()
             result = {
                 error: false,
                 transactionId: createdTransaction.txn_id,
                 transactionPayAdress: createdTransaction.address
             }
            
        } catch (error) {
              result = {
                  error: true,
                  message: error.toString() 
              }  
        }
        return result
    }
    async end_byeYDM(userID,transactionId){
        var result
        try {
                var user = await User.findOne({id:userID})
                var transavtion = await PayTransactions.findOne({id: transactionId})
                if(transavtion == undefined){
                    result = {
                        error: true,
                        message: "This user have not active transactions"
                    }
                }
                else{
                     var balance = await Balances.findOne({user: user})
                     var addSum: number = transavtion.count
                     balance.YDM_balance += addSum
                     await balance.save()
                     result = {
                         error: false
                     }
                     PayTransactions.delete({id: transactionId})
                }
        } catch (error) {
              result = {
                  error: true,
                  message: error
              }  
        }
        return result
    }

    async getActualRates(){
        var rates = await this.paymentsService.getRate()
        return rates
    }
    getCurrent_YDM_rate(){
        return base_config.YDM_RATE
    }

}
