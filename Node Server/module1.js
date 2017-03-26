function myFunc() {
  console.log('Function was called.');
}

const myString = 'This is string from module1.js';

module.exports.myFunc = myFunc;
module.exports.myStr = myString;
