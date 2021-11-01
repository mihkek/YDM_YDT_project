import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ReferalLink } from 'src/models/ReferalLink';
import { User } from 'src/models/User';
import { ApiService } from './api.service';
import { AccessControlService } from 'src/access-control/access-control.service';
import { EmailWorkerService } from 'src/email-worker/email-worker.service';
import { ChangePasswordWait } from 'src/models/ChangePasswordWait';
import { PaymentsService } from 'src/payments/payments.service';
import { CoinpaymentsRatesResponse } from 'coinpayments/dist/types/response';

@Controller('api/public')
export class ApiPublicController {
    constructor(private apiService: ApiService,
                private accessControlService: AccessControlService,
                private emailWorkerService: EmailWorkerService,
                private paymentsService: PaymentsService){}

    @Post('get_actual_coins_for_pay')
    async getActualCoinsForPay(@Res() res,@Req() req){
         var rates = await this.apiService.getActualRates()
         res.json({
             coins: rates,
             error: false
         })
    }
    @Post("get_base_data")
    async ByeYdm(@Res() res,@Req() req){
           var currentRate = this.apiService.getCurrent_YDM_rate()
           res.json({
               currentRate: currentRate,
               error: false
           })
    }
    @Get("check-referal-link")
    async checkReferalLink(@Res() res,@Req() req){
        await User.find()
        var referalLink = await ReferalLink.findOne({link: req.query.code}, {relations:['user']})
        console.log(referalLink)
        if(!referalLink){
            res.json({
                error: true,
                message: "Referal link is not valid"
            })
        }else{
            res.json({
                error: false,
                user: referalLink.user
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
             var user = await User.findOne({email: req.body.email})
             passwordWait.code = code
             passwordWait.userId = user.id
             await passwordWait.save()

        }catch(error){
            error = true
            errorMessage = error
        }
         res.json({
             error: error,
             message: errorMessage,
             userId: user.id
         })
    }
    @Post("changePassword_checkCode")
    async changePassword_checkCode(@Res() res,@Req() req){

        var user = await User.findOne({email: req.body.email})
        var passwordWait = await ChangePasswordWait.findOne({userId: user.id})
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
        console.log(req.body.code)
        console.log(passwordWait.code)
        ChangePasswordWait.delete({userId: req.body.userId})
        console.log("Check code - "+ check)
        res.json({
            error: !check
        })
    }
    @Post("changePassword_writeNewPassword")
    async changePassword_writeNewPassword(@Res() res,@Req() req){
         var user = await User.findOne({email: req.body.email})
         ChangePasswordWait.delete({userId: user.id})
         var saveResult = await this.accessControlService.chagneUserPassword(req.body.password,user.id)
         res.json({
             error : saveResult.error,
             message : saveResult.message
         })
    }
    @Post("test_pay")
    async test_pay(@Res() res,@Req() req){
       res.json({
          res: await this.paymentsService.createTransaction_YDM("mihkek11", "mihkek991@gmail.com", 2)//("CPFJ0R2F8WVVAC56PJYNYTL8MV")
       })
    }
    @Post("test_transaction_info")
    async test_transaction_info(@Res() res,@Req() req){
       res.json({
          res: await this.paymentsService.getTransactionInfo("CPFJ057FJDB5WKIADOMDC9INZA")
       })
    }
    
}
