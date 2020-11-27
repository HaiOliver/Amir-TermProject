var crypto = require('crypto');

const createAPIKey = (email) =>{
      let APIKey = crypto.createHash('md5').update(email).digest("hex");

      return APIKey
    }


    module.exports = createAPIKey;