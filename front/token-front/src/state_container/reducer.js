import { initial_state } from "./initial_state";
import * as CREATORS from './action_creator'
import * as LocalStorage from '../static/functions/local_storage'

export function app_reducer(state = initial_state, action){
    switch(action.type){
        case CREATORS.LOGIN:
            LocalStorage.setBoolean('logied', true)
            return{
                ...state,
                logied: true
            }
        case CREATORS.LOGOUT:
            LocalStorage.setBoolean('logied', false)
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