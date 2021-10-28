const abs = Math.abs;
const closest_value = (array,value) => array.reduce((p,c) => abs(c-value) < abs(p-value) ? c : p);
export default closest_value