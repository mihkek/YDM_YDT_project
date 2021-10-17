export function getDiffDate(timeStart, timeEnd){
    var hourDiff = timeEnd - timeStart; //in ms
    var secDiff = hourDiff / 1000; //in s
    var minDiff = hourDiff / 60 / 1000; //in minutes
    var hDiff = hourDiff / 3600 / 1000; //in hours
    var diff = {};
    diff.hours = Math.floor(hDiff);
    diff.minutes = minDiff - 60 * diff.hours;
    return diff
    // console.log(diff); //{hours: 0, minutes: 30}
}