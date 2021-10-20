export function generateRandomString(symbols){
    var result       = '';
    var words        = symbols;
    var max_position = words.length - 1;
    var position = 0
        for( var i = 0; i < 5; ++i ) {
            position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
        }
    return result;
}