import { Controller, Post, Req, Res } from '@nestjs/common';
import { render } from 'pug';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService){}

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

}
