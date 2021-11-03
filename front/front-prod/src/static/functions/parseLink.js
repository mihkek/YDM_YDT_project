export const parseLink = (link) =>{
    var serverPort = link.substring(0, link.indexOf("/")).split(":")

    //Set for output
    var serverName =  serverPort.length >= 1 ? serverPort[0] : "not set"
    var port = serverPort.length >= 2 ? serverPort[1] : "not set" 
    //

    var apiAndParams = link.substring(link.indexOf("/"), link.length)
    var paramsBlockBeginIndex = apiAndParams.indexOf("?")

    //Set for output
    var api =  paramsBlockBeginIndex != -1 
                    ? apiAndParams.substring(0, apiAndParams.indexOf("?")) 
                    : apiAndParams
    var params = {}
    //

    if(paramsBlockBeginIndex != -1){
        //set for output
        var paramsBlock = apiAndParams.substring(paramsBlockBeginIndex+1, apiAndParams.length).split("&")
        for(var i = 0;i<paramsBlock.length;i++){
            var data = paramsBlock[i].split('=')
            params[data[0]] = data[1]
        }
        //
    }

    return{
        serverName: serverName,
        serverPort: port,
        apiPath: api,
        params: params
    }
}