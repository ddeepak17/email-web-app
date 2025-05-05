const crypto = require('crypto');
const password = 'ilovecsci2170'; 
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log('Your hashed password is: ', hash);