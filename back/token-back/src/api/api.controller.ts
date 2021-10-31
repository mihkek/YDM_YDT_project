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
import { PaymentsService } from 'src/payments/payments.service';

@Controller('api/private')
export class ApiController {
    constructor(private apiService: ApiService,
                private accessControlService: AccessControlService,
                private emailWorkerService: EmailWorkerService,
                private paymentsService: PaymentsService){}

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
        var result = await this.apiService.getUserDataForDashboard(req.body.userId)
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
        var hasReferal = true
        
        if(refeUser.length == 0)
          hasReferal = false

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
