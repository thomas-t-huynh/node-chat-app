let moment = require('moment');

// let date = new Date();
// let months = ['Jan', 'Feb']
// console.log(date.getMonth());



let createdAt = 1234;
let date = moment(createdAt);


console.log(date.format('MMM Do, YYYY h:mm a'));