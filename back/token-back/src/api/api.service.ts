import { Injectable } from '@nestjs/common';
import { User } from 'src/models/User';
import { Balances } from 'src/models/Balances';
import { PayTransactions } from 'src/models/PayTransactions';
import { Transaction } from 'typeorm';
const configs = require('../../config.json')

@Injectable()
export class ApiService {
    async start_byeYMD(userId, count){
        var result
        try {
            var user = await User.findOne({id: userId})
            var balance = await Balances.findOne({user: user})

            if(!balance)
                throw new Error("Cannot find data about user with this ID. Try some another ID");
                
            var totalSum : number = count * configs.YDM_RATE
            var checkTransaction = await PayTransactions.findOne({balance: balance})

            if(checkTransaction != undefined)
                throw new Error("You already have active transaction. After this transaction will be done, you can bye YDM");

             var transaction = new PayTransactions()
             transaction.balance = balance
             transaction.summa = totalSum
             await transaction.save()
             result = {
                 error: false
             }
            
        } catch (error) {
              result = {
                  error: true,
                  message: error
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
                     var addSum: number = transavtion.summa
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

}
