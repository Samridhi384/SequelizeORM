// function call() {
//   console.log(global);
//   global.console.log("global object");
//   globalThis.setTimeout(() => {
//     console.log("ok timeout");
//   }, 2000);
// }

// call();

const second = require("./second");

var message = "simple message from app.js";

console.log(second.message);
console.log(message);
console.log(second.second_variable);
console.log(second.sayHello);
