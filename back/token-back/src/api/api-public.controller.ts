import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ReferalLink } from 'src/models/ReferalLink';
import { ApiService } from './api.service';

@Controller('api/public')
export class ApiPublicController {
    constructor(private apiService: ApiService){}

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
        var referalLink = await ReferalLink.findOne({link: req.query.code})
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
}
