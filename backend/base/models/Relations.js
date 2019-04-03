const Sequelize = require('sequelize');
const db = require('../base-connect');

const Responses = require('../../helpers/responses');

const User = db.import(__dirname + '/User.js');
const Expense = db.import(__dirname + '/Expense.js');
const Category = db.import(__dirname + '/Category.js');

Expense.belongsTo(Category);
Expense.belongsTo(User);
Category.belongsTo(User);

Expense.getAllForUserWithCat = function(userId, fn) {
    Expense.findAll({
        include : [
            {
                model : Category, as : 'category'
            }
        ],
        where : {
            userId : userId
        }
    })
    .then(expenses => {
        return fn(Responses.OK(expenses));
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    })
}


db.sync();


module.exports = function(db, DataType) {
    return {User, Expense, Category};
}