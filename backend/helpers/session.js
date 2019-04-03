const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config.json');

const Responses = require('./responses');

const AuthService = (() => {

    const verify = (token) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                jwt.verify(token, config.key.secret, function(err, decoded) {
                    if (err)
                        reject((Responses.AUTHENTICATION_FAILED));
                    else   
                        resolve(decoded);
                });
            }, 1000);
        });
    };

    return {
        verify : verify
    }
    
})();

module.exports = AuthService;