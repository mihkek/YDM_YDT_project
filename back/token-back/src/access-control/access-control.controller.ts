import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { check } from 'prettier';
import {AccessControlService} from './access-control.service'

@Controller('access-control')
export class AccessControlController {
    constructor(private accessControlService:AccessControlService){}

    @Post("signup")
    async signin(@Res() res,@Req() req){
        //sending email function call will be here 
        var try_add = await this.accessControlService.createUser(req.body.email, req.body.password)
            res.json({
                success: !try_add.error,
                message: try_add.message
            })
    }
    @Post("login")
    async login(@Res() res,@Req() req){
        var checkRes = await this.accessControlService.checkUser(req.body.email, req.body.password)
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
}
