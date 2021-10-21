import { Controller, Post, Req, Res } from '@nestjs/common';
import { render } from 'pug';
import { ApiService } from './api.service';
import { AccessControlService } from '../access-control/access-control.service'
import { EmailWorkerService } from 'src/email-worker/email-worker.service';
import {SignUpConfirmWait} from '../models/SignUpConfirmWait'
import {getDiffDate} from '../functions/getDiffDates'
import { ChangePasswordWait } from 'src/models/ChangePasswordWait';
import { User } from 'src/models/User';
import { Balances } from 'src/models/Balances';

@Controller('api/private')
export class ApiController {
    constructor(private apiService: ApiService,
                private accessControlService: AccessControlService,
                private emailWorkerService: EmailWorkerService){}

    @Post("bye-ydm")
    async ByeYdm(@Res() res,@Req() req){
            var result = await this.apiService.start_byeYMD(req.body.userId, req.body.count)
            res.json(result)
    }
    @Post("stop_transaction")
    async EndTransaction(@Res() res,@Req() req){
        var result = await this.apiService.end_byeYDM(req.body.userId, req.body.transactionId)
        result.error ? res.json(result) : render(req.body.link)
    }
    @Post("user_dashboard")
    async user_dashboard(@Res() res,@Req() req){
        var result = await this.apiService.getUserBalanceInfo(req.body.userId)
        res.json(result)
    }
    @Post("save_new_wallet")
    async save_new_wallet(@Res() res,@Req() req){
        var result = await this.apiService.chagneUserWallet(req.body.userId, req.body.wallet)
        res.json(result)
    }
    @Post("get_profile_user")
    async get_profile_user(@Res() res,@Req() req){
        var user = await User.findOne({id: req.body.userId})
        var refeUser = await User.query(
            "select * from users where id = ("+
            "select referal_link.\"userId\" from referal_link " +
            "join refe_user on referal_link.id = \"referallinkId\" where refe_user.\"userId\" = "+req.body.userId+") limit 1")
        var hasReferal = false
        
        if(refeUser.length == 0)
          hasReferal = true

        if(!user){
            res.json({
                error: true,
                message: "User with this id does not exists"
            })
        }else{
            res.json({
                error: false,
                email: user.email,
                name: user.name,
                adress: user.adress,
                hasReferal: hasReferal,
                byReferalOf: refeUser
            })
        }
    }

    @Post("changePassword_sendCode")
    async changePassword_sendCode(@Res() res,@Req() req){
        var error = false
        var errorMessage = ""
        var code = ''
        try
        {
             code = await this.emailWorkerService.sendCheckCode(req.body.email)
             var passwordWait = new ChangePasswordWait()
             passwordWait.code = code
             passwordWait.userId = req.body.userId
             await passwordWait.save()

        }catch(error){
            error = true
            errorMessage = error
        }
         res.json({
             error: error,
             message: errorMessage
         })
    }
    @Post("changePassword_checkCode")
    async changePassword_checkCode(@Res() res,@Req() req){
        var passwordWait = await ChangePasswordWait.findOne({userId: req.body.userId})
        console.log(passwordWait)
        if(passwordWait == undefined){
            res.json({
                error: true,
                message: "Invalid query. Try agan"
            })
            return
        }
        var check = true
        if(req.body.code !== passwordWait.code) check = false
        ChangePasswordWait.delete({userId: req.body.userId})
        console.log("Check code - "+ check)
        res.json({
            error: !check
        })
    }
    @Post("changePassword_writeNewPassword")
    async changePassword_writeNewPassword(@Res() res,@Req() req){
         var saveResult = await this.accessControlService.chagneUserPassword(req.body.password, req.body.userId)
         res.json({
             error : saveResult.error,
             message : saveResult.message
         })
    }
    @Post("save_user_data")
    async save_user_data(@Res() res,@Req() req){
        var saveRes = await this.accessControlService.saveNewProfileData(
            {email: req.body.email, name: req.body.name, adress: req.body.adress}, 
            req.body.userId)
        res.json({
            error: saveRes.error,
            message: saveRes.message
        })
    }
}
