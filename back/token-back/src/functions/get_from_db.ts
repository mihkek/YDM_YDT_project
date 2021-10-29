import { Earnings } from 'src/models/Earings'
import { getConnection } from 'typeorm'
import {RefedUser} from '../models/refedUser'

export async function getReferalUsers_ofUser(userId) {
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
export async function  calcWeeklyROI(balanceId){
    // var earnings = await Earnings.find({where: {dat: "NOW() - INTERVAL '30 DAY'"}})
    var earnings = await getConnection("default")
                             .getRepository(Earnings)
                             .createQueryBuilder("earnings")
                             .select("sum(earns)")
                             .where("dat > NOW() - INTERVAL '30 DAY' and  \"balanceId\" = :balanceId", { balanceId: balanceId})
                             .getRawOne()
     return earnings.sum
 }
