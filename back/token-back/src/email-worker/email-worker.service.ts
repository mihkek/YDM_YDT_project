import { Injectable } from '@nestjs/common';
var emailcheck = require('email-existence')
var config = require('../../config.json')
var crypto = require('crypto');
const nodemailer = require('nodemailer')

@Injectable()
export class EmailWorkerService {
    async sendConfrimLink(email, confirmCode){
        // email = "mihkek991@yandex.ru"
        var confirmLink = this.genereateCofirmLink(confirmCode)
        var res = true
        let transporter = nodemailer.createTransport({
            service: config.MAIN_SENDING_SERVICE,
            port: config.MAIL_SENDING_PORT,
            secure: false,
            auth: {
                user: config.MAIL_SENDING_ACC_EMAIL,
                pass: config.MAIL_SENDING_ACC_PASSWORD
            },
          })
          let result = await transporter.sendMail({
            from: 'YD dragon',
            to: email,
            subject: 'Verify your email',
            text: 'Veryfy email accout on YD Dragon.',
            html:
              'For verify your email address, use this link <br/> '+confirmLink+' <br/> <strong>YD dragon</strong>.',
          }, function(err, info) {
            //   res = false
            //   console.log(err)
            //   console.log(info)
             throw new Error("Cennot send email. "+err)
          })
          
          return res
          
    }
    async checkEmailAddressExists(email, callback){
        await emailcheck.check(email, function(err,res){
                if(err) callback( {error: true, message: err, exists: false})
                else callback({error: false, message: "", exists: res})
        });
    }
    generateConfirmCode(){
        var result       = '';
        var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        var max_position = words.length - 1;
        var position = 0
            for( var i = 0; i < 5; ++i ) {
                position = Math.floor ( Math.random() * max_position );
                result = result + words.substring(position, position + 1);
            }
        return result;
    }
    genereateCofirmLink(personalCode){
        var link = config.SERVER_HOST + ":"+config.SERVER_PORT+"/access-control/signup_confirm"
        return link+"?code="+personalCode
    }
}
