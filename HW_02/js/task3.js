console.log('TASK 3');
//ES6;
function apllyAll(func, ...args) {
  return func.call(this, ...args);
}

//not ES6
// function apllyAll(func) {
//   var args = [].slice.call(arguments, 1);
//   return func.apply(this, args);
// }

function sum() {
  return [...arguments].reduce((prevArg, nextArg) => prevArg + nextArg, 0);
}
function mul() {
  return [...arguments].reduce((prevArg, nextArg) => prevArg * nextArg, 1);
}
