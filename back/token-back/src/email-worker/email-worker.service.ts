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
        this.sendEmail({
            from: 'YD dragon',
            to: email,
            subject: 'Veryfy email accout on YD Dragon.',
            text: 'Veryfy email accout on YD Dragon.',
            html:
              'For verify your email address, use this link <br/> '+confirmLink+' <br/> <strong>YD dragon</strong>.',
        })
        // let transporter = nodemailer.createTransport({
        //     service: config.MAIN_SENDING_SERVICE,
        //     port: config.MAIL_SENDING_PORT,
        //     secure: false,
        //     auth: {
        //         user: config.MAIL_SENDING_ACC_EMAIL,
        //         pass: config.MAIL_SENDING_ACC_PASSWORD
        //     },
        //   })
        //   let result = await transporter.sendMail({
        //     from: 'YD dragon',
        //     to: email,
        //     subject: 'Verify your email',
        //     text: 'Veryfy email accout on YD Dragon.',
        //     html:
        //       'For verify your email address, use this link <br/> '+confirmLink+' <br/> <strong>YD dragon</strong>.',
        //   }, function(err, info) {
        //      throw new Error("Cennot send email. "+err)
        //   })
          
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
            service: config.MAIN_SENDING_SERVICE,
            port: config.MAIL_SENDING_PORT,
            secure: false,
            auth: {
                user: config.MAIL_SENDING_ACC_EMAIL,
                pass: config.MAIL_SENDING_ACC_PASSWORD
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
        return this.generateRandomString('0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')
    }
    genereateCofirmLink(personalCode){
        var link = config.SERVER_HOST + ":"+config.SERVER_PORT+"/access-control/signup_confirm"
        return link+"?code="+personalCode
    }
    generateCheckCode(){
         return this.generateRandomString('0123456789')
    }
    generateRandomString(symbols){
        var result       = '';
        var words        = symbols;
        var max_position = words.length - 1;
        var position = 0
            for( var i = 0; i < 5; ++i ) {
                position = Math.floor ( Math.random() * max_position );
                result = result + words.substring(position, position + 1);
            }
        return result;
    }
}
