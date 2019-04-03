const Sequelize = require('sequelize');
const db = require('../base-connect');
const Responses = require('../../helpers/responses');

const Category = db.define('category', {
    name : Sequelize.STRING,
    description : Sequelize.STRING
});

Category.newCategory = function(category, fn) {
    Category.findOne({
        where : {
            name : category.name,
            userId : category.userId
        }
    })
    .then(categoryExists => {
        if (categoryExists)
            return fn(Responses.SAME_CATEGORY_NAME);
        else   
            Category.create({
                name : category.name,
                description : category.description,
                userId : category.userId
            })
            .then(category => {
                return fn(Responses.CATEGORY_DEFINED(category));
            })
            .catch(error => {
                return fn(Responses.NOK(error.message));
            });
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    });
}

Category.getAll = function(userId, fn) {
    Category.findAll({
        where : {
            userId : userId
        }
    })
    .then(categories => {
        return fn(Responses.OK(categories));
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    })
}

module.exports = function(db, DataTypes) {
    return Category;
}