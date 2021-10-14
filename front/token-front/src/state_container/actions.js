import * as CREATORS from './action_creator'

export const login = (params) =>{
    return {
        type: CREATORS.LOGIN,
        params
    }
}
export const logout = (params) =>{
    return{
        type: CREATORS.LOGOUT,
        params
    }
}
export const signup = (params) =>{
    return {
        type: CREATORS.SIGNUP,
        params
    }
}
export const signup_confirm = (params) =>{
    return {
        type: CREATORS.SIGNUP_CONFIRM,
        params
    }
} 
export const bye_token = (params) =>{
    return{
        type: CREATORS.BYE_TOKEN,
        params
    }
}
export const profile = (params) =>{
    return {
        type: CREATORS.PROFILE,
        params
    }
}
export const dashboard = (params) =>{
    return{
        type: CREATORS.DASHBOARD,
        params
    }
}
