var message = "updated message";
var other = "other message";

function sayHello() {
  console.log("hello");
}
// module.exports.message = message;
// module.exports.second_variable = other;

module.exports = {
  message: message,
  second_variable: other,
  sayHello: sayHello,
};
