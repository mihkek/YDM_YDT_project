import { Injectable } from '@nestjs/common';
import { User } from '../models/User';
import {SignUpConfirmWait} from '../models/SignUpConfirmWait'
import { Balances } from 'src/models/Balances';
import { generateRandomString } from 'src/functions/generateRandomString';
import { ReferalLink } from 'src/models/ReferalLink';

const configs = require('./../../config.json')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

@Injectable() 
export class AccessControlService {
    async addToConfirmWaiting(email, password, confirmCode){
        try{
            var currentDate = new Date()
            var newWaiting = new SignUpConfirmWait()
            newWaiting.email = email
            newWaiting.password = password
            newWaiting.confirmcode = confirmCode
            newWaiting.timeofborn = currentDate.toString()
            await newWaiting.save()
            return true
        }
        catch(error){
            return false
        }
    }   
    async createUser(email, password){
        var result = undefined
        await User.findOne({'email':email}).then(async(user)=>{
             if(user != undefined){
                result = {
                     error: true,
                     message: "User with this email already exist!"
                 }
             }
             else{
                var saveResult = await this.setUserData({email: email, password: password})
                var lastUser = await User.findOne({email: email})
                var userBalance = new Balances()
                userBalance.user = lastUser
                await userBalance.save()

                var userReferal = new ReferalLink()
                userReferal.user = lastUser
                userReferal.link = generateRandomString(email+ "123456789")
                await userReferal.save()
                result = {
                    error: false
                }
             }
        }).catch(error=>{
            result = {
                error: true,
                errorMessage: error
            }
         })
         return result
    }
    async chagneUserPassword(password, id){
       return this.setUserData({password: password}, id)
    }
    async saveNewProfileData(params, userId){
        return this.setUserData(params, userId)
    }
    async setUserData(params, userId = -1){
        var user = new User()
        var result
        console.log(params)
        try{
            if(userId != -1){
                user = await User.findOne({id: userId})
                if(!user){
                    result = {
                        error: true,
                        message: "Cannot find user"
                    }
                }
            }
            params.adress !== undefined ? user.adress = params.adress : {}
            params.name !== undefined ? user.name = params.name : {}
            params.email !== undefined ?  user.email = params.email : {}
            if(params.password != undefined){
                var salt = this.generateSalt()
                var hash = this.hashPassword(params.password, salt)
                user.password = hash
                user.salt = salt
            } 
            await user.save()
            result = {
                error: false,
                user: user
            }
        }catch(error){
            result = {
                error: true,
                message: error,
            }
        }

        return result
    }
    async checkUser(email, password){
        var result = undefined

        await User.findOne({'email':email}).then((user)=>{
             if(user != undefined){
                if(!this.compareHashPassword(password, user.password))
                    result = {
                        error: true,
                        message: "Incorrect password",
                        user: user
                    }
                else{
                    result = {
                        error: false,
                        message: "",
                        user:user
                    }
                }
             }
             else{
                result =  {
                    error: true,
                    message: "User with this email does not exists"
                }
             }
        }).catch(error=>{
            result = {
                error: true,
                message: error
            }
         })
         return result
    }
    createToken(params){
        let payload = params

        console.log(configs.ACCESS_TOKEN_SECRET)
        console.log(configs.ACCESS_TOKEN_LIFE)

        let accessToken = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: configs.ACCESS_TOKEN_LIFE
        })
        return accessToken
    }
    verifyUser(token){
        var result;
        jwt.verify(token, configs.ACCESS_TOKEN_SECRET, function(err,decoded) {
             if(err){
                 result = {
                    accessAllow : false,
                    message: err
                 }
             }  
             else{
                 result={
                     accessAllow: true,
                     decoded:decoded
                 }
             }
        })
        return result
    }
    generateReferalLink(userEmail){

    }
     compareHashPassword(password, hash){
        return bcrypt.compareSync(password, hash)
     }
     private generateSalt(){
        return bcrypt.genSaltSync(10);
      }
      private  hashPassword(password, salt){
         return  bcrypt.hashSync(password, salt);
      }
}

