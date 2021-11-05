import { Injectable } from '@nestjs/common';
import {generateRandomString} from '../functions/generateRandomString'
var emailcheck = require('email-existence')
import base_config from 'src/config/base_config';
const nodemailer = require('nodemailer')

@Injectable()
export class EmailWorkerService {
    async sendConfrimLink(email, confirmCode){
        var confirmLink = this.genereateCofirmLink(confirmCode)
        var res = true
        this.sendEmail({
            from: 'YD dragon',
            to: email,
            subject: 'Veryfy email accout on YD Dragon.',
            text: 'Veryfy email accout on YD Dragon.',
            html:
              'For verify your email address, use this link <br/> '+confirmLink+' <br/> <strong>YD dragon</strong>.',
        })
          return res
          
    }
    async sendCheckCode(email){
        var code = this.generateCheckCode()
        this.sendEmail({
            from: 'YD dragon',
            to: email,
            subject: 'Code for changing password',
            text: 'Confirm an action',
            html:
              'Your check code for changing password <br/> '+code+' <br/> <strong>YD dragon</strong>.',
        })
        return code 
    }

    async sendEmail(params){
        let transporter = nodemailer.createTransport({
            service: base_config.MAIN_SENDING_SERVICE,
            port: base_config.MAIL_SENDING_PORT,
            secure: false,
            auth: {
                user: base_config.MAIL_SENDING_ACC_EMAIL,
                pass: base_config.MAIL_SENDING_ACC_PASSWORD
            },
          })
            await transporter.sendMail({
            from: params.from,
            to: params.to,
            subject: params.subject,
            text: params.text,
            html:
              params.html,
          }, function(err, info) {
             throw new Error("Cennot send email. "+err)
          })
    }
    async checkEmailAddressExists(email, callback){
        await emailcheck.check(email, function(err,res){
                if(err) callback( {error: true, message: err, exists: false})
                else callback({error: false, message: "", exists: res})
        });
    }
    generateConfirmCode(){
        return generateRandomString('0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')
    }
    genereateCofirmLink(personalCode){
        var link = base_config.SERVER_HOST + ":"+base_config.SERVER_PORT+"/access-control/signup_confirm"
        return link+"?code="+personalCode
    }
    generateCheckCode(){
         return generateRandomString('0123456789')
    }
}
