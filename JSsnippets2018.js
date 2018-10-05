var years = [85,15,48,65]

function calculate(arr,fn){
  var newarr=[];
  arr.forEach(e=> newarr.push(fn(e)));
  return newarr;
}
function addname(el){
  return el +' ass'
}
var calculatename= calculate(years,addname);

console.log (calculatename)

//functions returning functions
function generic(job){
  if (job='salesman'){
    return function(name){
      console.log(name +' '+ job)
    }
  }
}
var teacher= generic('salesman'); //duodam generic funkcijai pirma parametra
teacher('john')  // generic funkcijos viduj funkcijai antra parametra
//arba
generic('salesman')('john')

//CLOSURE -  kai funkcija su parametru ar argumentais returnina kita funkcija,  ta kita funkcija  darvis gali pasiekti  argumentus ir parametrus  pagrindines funkcijos. 