const Sequelize = require('sequelize');
const db = require('../base-connect.js');

var crypto = require('crypto');

var Responses = require('../../helpers/responses.js');

const User = db.define('user', {
    username : Sequelize.STRING,
    password : Sequelize.STRING,
    firstName : Sequelize.STRING,
    lastName : Sequelize.STRING,
    mail : Sequelize.STRING
});

User.addUser = function(user, fn) {
    User.findOne({
        where : {
            username : user.username
        }
    })
    .then(userExists => {
        if (userExists) 
            return fn(Responses.USER_ALREADY_EXISTS);
        else {
            User.create({
                username : user.username,
                password : crypto.createHash('md5').update(user.password).digest('hex'),
                firstName : user.firstName,
                lastName : user.lastName,
                mail : user.mail
            })
            .then(user => {
                if (user) 
                    return fn(Responses.USER_REGISTERED(user));
            })
            .catch(error => {
                return fn(Responses.NOK(error.message));
            });
        }
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    })
}

User.findUser = function(user, fn) {
    User.findOne({
        where : {
            username : user.username,
            password : crypto.createHash('md5').update(user.password).digest('hex'),
        }
    })
    .then(user => {
        if (user)
            return fn(Responses.OK(user));
        else   
            return fn(Responses.UNKNOWN_USER);
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    })
}

module.exports = function(db, DataTypes) {
    return User;
}