import { initial_state } from "./initial_state";
import * as CREATORS from './action_creator'
import * as LocalStorage from '../static/functions/local_storage'

export function app_reducer(state = initial_state, action){
    switch(action.type){

        case CREATORS.GET_INITIAL_DATA:
            LocalStorage.setNumber('currentRate', action.params.currentRate)
            return{
                ...state,
                currentRate: action.params.currentRate
            }
        
        case CREATORS.USE_USER_EMAIL:
            return{
                ...state,
                userEmail: action.params.userEmail
            }

        case CREATORS.LOGIN:
            LocalStorage.setBoolean('logied', true)
            LocalStorage.setNumber('userId', action.params.userId)
            LocalStorage.setString('token', action.params.token)
            LocalStorage.setString('userEmail', action.params.userEmail)
            return{
                ...state,
                logied: true,
                userId: action.params.userId,
                token: action.params.token,
                userEmail: action.params.userEmail
            }
        case CREATORS.LOGOUT:
            LocalStorage.setBoolean('logied', false)
            LocalStorage.setNumber('userId', 0)
            LocalStorage.setString('token', '')
            LocalStorage.setString('userEmail', '')

            return{
                ...state,
                logied: false
            }
        case CREATORS.SIGNUP:
            LocalStorage.setBoolean('isWaitingForSignUp', true)
            return{
                ...state,
                isWaitingForSignUp: true
            }
        case CREATORS.SIGNUP_CONFIRM:
            LocalStorage.setBoolean('isWaitingForSignUp', false)
            return{
                ...state,
                isWaitingForSignUp: false
            }
        default: 
           return state
    }
    
}