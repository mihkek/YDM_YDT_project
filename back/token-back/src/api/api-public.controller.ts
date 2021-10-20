import { Controller, Post, Req, Res } from '@nestjs/common';
import { render } from 'pug';
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
}
