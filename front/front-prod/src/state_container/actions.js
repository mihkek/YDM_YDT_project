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
export const get_initial_data = (params) =>{
    return {
        type: CREATORS.GET_INITIAL_DATA,
        params
    }
}
export const signup_confirm = (params) =>{
    return {
        type: CREATORS.SIGNUP_CONFIRM,
        params
    }
} 
export const use_user_email = (params) =>{
    return{
        type: CREATORS.USE_USER_EMAIL,
        params
    }
}

export const set_active_transaction = (params) =>{
    return{
        type: CREATORS.SET_ACTIVE_TRANSACTION,
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
