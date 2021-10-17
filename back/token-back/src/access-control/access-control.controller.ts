import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { check } from 'prettier';
import {AccessControlService} from './access-control.service'
import { EmailWorkerService } from 'src/email-worker/email-worker.service';
import {SignUpConfirmWait} from '../models/SignUpConfirmWait'
import {getDiffDate} from '../functions/getDiffDates'
var configs = require('../../config.json')
var moment = require('moment')


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
            isEmailExists = result
            console.log("Here !  - - - - " + isEmailExists)
            if(isEmailExists.error){
                res.json({
                    error: true,
                    message: "Server error",
                }).send()
            }
            if(!isEmailExists.exists){
                console.log("Email is shit!")
                res.json({
                    error: true,
                    message: "This email does not exist"
                }).send()
            }
        }).then(async()=>{
            var hasError = false
            var errorMessage = ""
            try{
                var confirmCode = this.emailWorkerService.generateConfirmCode()
                var codeSent = await this.emailWorkerService.sendConfrimLink(req.body.email, confirmCode)
                var addedToWait = await this.accessControlService.addToConfirmWaiting(req.body.email, req.body.password, confirmCode)
                hasError = false
                if(!addedToWait) hasError = true
                if(!codeSent) hasError = true
             }catch(err){
                 hasError  = true
                 errorMessage = err
            }
            console.log("error - " + hasError)
            res.json({
                error: hasError,
                message: errorMessage
            }).send()
        })
    }
    @Get("signup_confirm")
    async signup_confirm(@Res() res,@Req() req){
        var error = false
        var waiting = await SignUpConfirmWait.findOne({confirmcode:req.query.code})
        console.log(waiting)
        var currentTime = new Date()
        var linkBornTime = Date.parse(waiting.timeofborn)
        var diff = getDiffDate(currentTime, linkBornTime)
        if(diff.minutes>configs.EMAIL_CONFIRM_LINK_LIFE_TIME)
            error = true
       
        var try_add = await this.accessControlService.createUser(waiting.email, waiting.password)
        var email = waiting.email
        SignUpConfirmWait.delete({confirmcode:req.query.code})
        error = try_add.error

        res.redirect("http://localhost:3000/signup_confirm?error"+error+"&log="+email)
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

