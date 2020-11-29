let jwt = require('jsonwebtoken');

const creatJWTToken = (email, promo) =>{
    return jwt.sign({
      email: email,
      promo: promo
    },"MYSECRETKEY")
    }


    module.exports = creatJWTToken;