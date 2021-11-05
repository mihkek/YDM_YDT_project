import base_config from "src/config/base_config"

export function getReferalLink(uniqueCode){
    var baseUrl = base_config.SERVER_HOST+ ":" + base_config.SERVER_PORT+ "/api/public/check-referal-link"
    return {
        link: baseUrl + "?code="+uniqueCode,
        code: uniqueCode
    } 
}