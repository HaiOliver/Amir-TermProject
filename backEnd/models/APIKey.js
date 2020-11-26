var crypto = require('crypto');

const createAPIKey = (email) =>{
      var mykey = crypto.createCipher('aes-128-cbc', email);
      var mystr = mykey.update('abc', 'utf8', 'hex')
      return mystr += mykey.final('hex');

    }

    module.exports = createAPIKey;