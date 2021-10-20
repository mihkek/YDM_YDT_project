export const parseLink = (link) =>{
    var serverPort = link.substring(0, link.search("/")).split(":")
    serverName =  serverPort.length >= 1 ? serverPort[0] : "not set"
    port = serverPort.length >= 2 ? serverPort[1] : "not set" 
    

    return{
        serverName: '',
        serverPort: '',
        apiPath: '',
        params: ''
    }
}