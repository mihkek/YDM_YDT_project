import { Balances } from "src/models/Balances"
import deepCopy from "src/functions/deep_copy_of_objects"
import closest_value from "src/functions/closest_value"
import { User } from "src/models/User"
import * as calcs from '../functions/calc'
import getReferalUsers_ofUser from "src/functions/get_from_db"
import { ReferalLink } from "src/models/ReferalLink"

const schedule = require('node-schedule');


const configs = require('../../config.json')

const daily_earn_balance = require('../data/daily-earn-by-balance.json')
const daily_earn_referals = require('../data/daily-earns-for-referals.json')

var arrayOfEarns = deepCopy(daily_earn_balance.earns)

export async function DailyEarn_byBalance() {
    const rule = new schedule.RecurrenceRule();
    rule.hour = configs.HOUR_FOR_EARN;
    const job = schedule.scheduleJob(rule, function(){
         earn_YDT()
      });
}
export async function DailyEarn_forReferals() {
    const rule = new schedule.RecurrenceRule();
    rule.hour = configs.HOUR_FOR_EARN_REFERAL;
    const job = schedule.scheduleJob(rule, function(){
         earn_Referals()
      });
}
async function earn_YDT() {
    var users = await User.find({order: {id: 'ASC' }})
    var balances = await Balances.find({order: {YDM_balance: 'ASC' }})
    balances.forEach(balance => {
        var targetValue = closest_value(Object.keys(arrayOfEarns), balance.YDM_balance)
        var earn = arrayOfEarns[targetValue]
        balance.YDT_balance = calcs.numberPlusNumber(earn, balance.YDT_balance)
        balance.save()
    });
    console.log("Tokens earned")
}
async function earn_Referals() {
    var users = await User.find()
    users.forEach( async (user) => {
        var referals = await getReferalUsers_ofUser(user.id)
        var referalLink = await ReferalLink.findOne({user: user})
        var cnt = calcs.numberMultiplyNumber(daily_earn_referals.one_refer_daily_earn, referals.count)
        referalLink.earns = calcs.numberPlusNumber(referalLink.earns, cnt)
        await referalLink.save()
    });
    console.log("Tokens for referals earned")
}


