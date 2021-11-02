import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AccessControlService } from "src/access-control/access-control.service";

@Injectable()
export class TokenControlMiddleware implements NestMiddleware {

    constructor(private accessControlService:AccessControlService){}

     async use(req: Request, res: Response, next: NextFunction) {
        var token = req.body.token
        var isDev = false//req.body.isDev
        if(isDev) next()
        else{
            var verify = await this.accessControlService.verifyUser(token) 
            if(!verify.accessAllow){
                res.json({
                    invalidToken: 1,
                    error: true,//verify.message,
                    message: "Invalid access-token"
                })
            }
            else
                next();
        }
    }
}