import { async } from "rxjs"
import { Balances } from "src/models/Balances"
const daily_earn_balance = require('../data/daily-earn-by-balance.json')
const daily_earn_referals = require('../data/daily-earns-for-referals.json')

export async function DailyEarn_byBalance() {
    setInterval(()=>{
        console.log("tokens earned")
    }, 1000)
}
export async function DailyEarn_forReferals() {
    setInterval(()=>{
        console.log("referals earned")
    }, 1000)
}
    
