import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { check } from 'prettier';
import {AccessControlService} from './access-control.service'
import { EmailWorkerService } from 'src/email-worker/email-worker.service';
import { async, config } from 'rxjs';
import { resourceUsage } from 'process';

@Controller('access-control')
export class AccessControlController {
    constructor(
        private accessControlService:AccessControlService,
        private emailWorkerService:EmailWorkerService){}

    @Post("signup")
    async signin(@Res() res,@Req() req){
        //sending email function call will be here 
        var isEmailExists
        await this.emailWorkerService.checkEmailAddressExists(req.body.email, async (result)=>{
            if(isEmailExists.error){
                res.json({
                    error: true,
                    message: "Server error",
                }).send()
            }
            if(!isEmailExists.exists){
                res.json({
                    error: true,
                    message: "This email does not exist"
                }).send()
            }
        }).then(async()=>{
            var hasError = false
            var errorMessage = ""
            try{
                var confirmCode = this.emailWorkerService.sendConfrimLink(req.body.email)
                var addedToWait = await this.accessControlService.addToConfirmWaiting(req.body.email, req.body.password, confirmCode)
                hasError = false
                if(!addedToWait) hasError = true
             }catch(err){
                 hasError  = true
                 errorMessage = err
            }
            res.json({
                error: hasError,
                message: errorMessage
            }).send()
        })
    }
    @Get("signup_confirm")
    async signup_confirm(@Res() res,@Req() req){
        var try_add = await this.accessControlService.createUser(req.body.email, req.body.password)
        res.json({
            success: !try_add.error,
            message: try_add.message
        })
    }
    @Post("login")
    async login(@Res() res,@Req() req){
        var checkRes = await this.accessControlService.checkUser(req.body.email, req.body.password)
        console.log(checkRes)
        // await setTimeout(() => {}, 1000)
        if(checkRes.error)
            res.json({
                success: false,
                message: checkRes.message, 
                user: checkRes.user
            })
        else{
            var token = this.accessControlService.createToken({login :req.body.email, password:req.body.password})
            res.json({
                success: true,
                token: token, 
                user: checkRes.user
            })
        }
    }
    @Post("test")
    async test(@Res() res,@Req() req){
      
    }
}

