import {RefedUser} from '../models/refedUser'

async function getReferalUsers_ofUser(userId) {
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
export default getReferalUsers_ofUser