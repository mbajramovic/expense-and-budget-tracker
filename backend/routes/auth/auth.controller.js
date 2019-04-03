const db = require('../../base/base-connect.js');
const jwt = require('jsonwebtoken');

const config = require('../../config/jwt.config.json');
const { User} = db.import('../../base/models/Relations.js');


const AuthController = (() => {
    
    const register = (req, res) => {
        const user = req.body.user;
        User.addUser(user, (data) => {
            res.end(JSON.stringify(data));
        });
    };

    const login = (req, res) => {
        var user = {
            username : req.body.username,
            password : req.body.password
        }
        User.findUser(user, (data) => {
            if (data.statusCode == 200) {
                var token = jwt.sign({id : data.data.id, username : user.username}, config.key.secret, { expiresIn : 86400});
                data.token = token;
            }
            res.end(JSON.stringify(data));
        });
    };

    return {
        register : register,
        login : login
    }
})();

module.exports = AuthController;