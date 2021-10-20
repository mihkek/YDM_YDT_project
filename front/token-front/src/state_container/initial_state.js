import * as LocalStorage from '../static/functions/local_storage'

export const initial_state = {
    logied: LocalStorage.getBoolean('logied'),
    token: LocalStorage.getString('token'),
    userId: LocalStorage.getNumber('userId'),
    isWaitingForSignUp: LocalStorage.getBoolean('isWaitingForSignUp'),
    currentRate: LocalStorage.getNumber('currentRate')
}