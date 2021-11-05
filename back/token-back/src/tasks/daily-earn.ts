import { Balances } from "src/models/Balances"
import deepCopy from "src/functions/deep_copy_of_objects"
import closest_value from "src/functions/closest_value"
import { User } from "src/models/User"
import * as calcs from '../functions/calc'
import {getReferalUsers_ofUser} from "src/functions/get_from_db"
import { calcWeeklyROI } from "src/functions/get_from_db"
import { ReferalLink } from "src/models/ReferalLink"
import { Earnings } from "src/models/Earings"

import base_config from "src/config/base_config"
import dailyEarnsForReferals from "src/config/daily-earns-for-referals"
import dailyEarnByBalance from "src/config/daily-earn-by-balance"

const schedule = require('node-schedule');

var arrayOfEarns = deepCopy(dailyEarnByBalance.earns)

export async function DailyEarn_byBalance() {
    const rule = new schedule.RecurrenceRule();
    rule.hour = base_config.HOUR_FOR_EARN;
    const job = schedule.scheduleJob(rule, function(){
         earn_YDT()
      });
}
export async function DailyEarn_forReferals() {
    const rule = new schedule.RecurrenceRule();
    rule.hour = base_config.HOUR_FOR_EARN_REFERAL;
    const job = schedule.scheduleJob(rule, function(){
         earn_Referals()
      });
}
async function earn_YDT() {
    var balances = await Balances.find({order: {YDM_balance: 'ASC' }})
    balances.forEach(async(balance) => {
        var targetValue = closest_value(Object.keys(arrayOfEarns), balance.YDM_balance)
        var earn = arrayOfEarns[targetValue]
        balance.YDT_balance = calcs.numberPlusNumber(earn, balance.YDT_balance)
        balance.AllTimeRoi = calcs.numberPlusNumber(earn, balance.AllTimeRoi)
        balance.CurrentDailyRoi = earn

        if(earn != 0){
            var earning = new Earnings()
            earning.balance = balance
            earning.earns = earn
            earning.dat = new Date()
            await earning.save()
        }
        var weeklyRoi = await calcWeeklyROI(balance.id)
        balance.WeeklyRoi =  weeklyRoi
        await balance.save()
        
    });
    console.log("Tokens earned")
}
async function earn_Referals() {
    var users = await User.find()
    users.forEach( async (user) => {
        var referals = await getReferalUsers_ofUser(user.id)
        var referalLink = await ReferalLink.findOne({user: user})
        
        if(referals.count == 0)
            return

        var cnt = calcs.numberMultiplyNumber(dailyEarnsForReferals.one_refer_daily_earn, referals.count)
        referalLink.earns = calcs.numberPlusNumber(referalLink.earns, cnt)
        await referalLink.save()
        var balance = await Balances.findOne({user:user})
        balance.AllTimeRoi = calcs.numberPlusNumber(balance.AllTimeRoi, cnt)
        await balance.save()

        var earning = new Earnings()
        earning.balance = balance
        earning.earns = cnt
        earning.dat = new Date()
        await earning.save()

        var weeklyRoi = await calcWeeklyROI(balance.id)
        balance.WeeklyRoi =  weeklyRoi
        await balance.save()
    });
    console.log("Tokens for referals earned")
}


