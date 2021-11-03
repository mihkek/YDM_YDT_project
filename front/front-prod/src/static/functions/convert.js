export const fromStringToBoolean = (value) =>{
    if (value == undefined) return false
    if(typeof value != "string") throw new Error("Invalid "+typeof value +" to string conversion")
    if(value.toLocaleLowerCase() == 'true') return true
    if(value.toLocaleLowerCase() == 'false') return false
    throw new Error("Cannot convert string "+value+" to boolean")
}