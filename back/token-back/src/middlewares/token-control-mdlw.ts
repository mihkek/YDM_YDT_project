import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AccessControlService } from "src/access-control/access-control.service";

@Injectable()
export class TokenControlMiddleware implements NestMiddleware {

    constructor(private accessControlService:AccessControlService){}

     async use(req: Request, res: Response, next: NextFunction) {
        var token = req.body.token
        var verify = await this.accessControlService.verifyUser(token) 
        if(!verify.accessAllow){
            res.json({
                accessAllow: false,
                error: verify.message,
                message: "Your token is not actual"
            })
        }
        else
            next();
    }
}