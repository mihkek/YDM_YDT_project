import { Injectable } from '@nestjs/common';
import { User } from 'src/models/User';
import { Balances } from 'src/models/Balances';
import { PayTransactions } from 'src/models/PayTransactions';
import { ReferalLink } from 'src/models/ReferalLink';
import { getReferalLink } from 'src/functions/getReferalLink';
import { RefedUser } from 'src/models/refedUser';
const configs = require('../../config.json')

@Injectable()
export class ApiService {
    async getUserBalanceInfo(userId){
        try{
            var user = await User.findOne({id: userId})
            var balance = await Balances.findOne({user:user})
            var referalLink = await ReferalLink.findOne({user: user})
            var link = getReferalLink(referalLink.link)
            return {
                error: false,
                balance: balance,
                user: user,
                referalLink_link: link,
                referalLink: referalLink
            }
        }catch(error){
            return {
                error: true,
                message: error.toString()
            }
        }
    }
    async getReferalUsers_ofUser(userId){
        try{
            var referUsers = await RefedUser.query(
            "select * from users where id in "
            +"(select refe_user.\"userId\" from refe_user join referal_link "
            +"on refe_user.\"referallinkId\" = referal_link.\"id\" where referal_link.\"userId\" = $1);", [userId])
            return{
                users: referUsers,
                count: referUsers.length
            }
            
        }catch(error){
            return{
                hasReferal: false,
                users: []
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

    
    getCurrent_YDM_rate(){
        return configs.YDM_RATE
    }

}
