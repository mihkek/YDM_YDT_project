import { initial_state } from "./initial_state";
import * as CREATORS from './action_creator'

export function app_reducer(state = initial_state, action){
    switch(action){
        case CREATORS.LOGIN:
            return{
                ...state,
                logied: true
            }
        case CREATORS.LOGOUT:
            return{
                ...state,
                logied: false
            }
    }
}