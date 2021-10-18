//GETTERS
export const getBoolean  = (propName) =>{
    var value = localStorage.getItem(propName)

    if(typeof value == "string"){ 
        return value === 'true' ? true : false
    }
    return value === undefined ? value : false
}
export const getString = (propName) =>{
    var value = localStorage.getItem(propName)
    return typeof value === typeof undefined ? "Parameter" +propName+ " not set" : value 
}
export const getNumber = (propName) =>{
    var value = localStorage.getItem(propName)
    if(typeof value != "number"){
        return Number(value)
    }
    return value === undefined ? value : -1
}
//SETTERS
export const setBoolean = (propName, value) =>{
    if(typeof value != "boolean" )
        throw new Error("Type error - the "+propName+" value must have boolean type. "+typeof value+" given")
    else{
        localStorage.setItem(propName, value)
    }
}
export const setString = (propName, value) =>{
    if(typeof value != "string" )
        throw new Error("Type error - the "+propName+" value must have string type. "+typeof value+" given")
    else{
        localStorage.setItem(propName, value)
    }
}
export const setNumber = (propName, value) =>{
    if(typeof value != "number" )
        throw new Error("Type error - the "+propName+" value must have number type. "+typeof value+" given")
    else{
        localStorage.setItem(propName, value)
    }
}