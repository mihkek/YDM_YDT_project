const configs = require('../../config.json')

export function getReferalLink(uniqueCode){
    var baseUrl = configs.SERVER_HOST+ ":" + configs.SERVER_PORT+ "/api/public/check-referal-link"
    return {
        link: baseUrl + "?code="+uniqueCode,
        code: uniqueCode
    } 
}