const Sequelize = require('sequelize');
const db = require('../base-connect');

const Responses = require('../../helpers/responses');

const Expense = db.define('exponse', {
    amount : Sequelize.DOUBLE,
    date : Sequelize.DATE,
    description : Sequelize.STRING,
    type : Sequelize.STRING,
    notes : Sequelize.STRING
});

Expense.newExpense = function(expense, fn) {
    Expense.create({
        amount : expense.amount,
        date : expense.date,
        description : expense.description,
        type : expense.type,
        notes : '',
        userId : expense.userId,
        categoryId : expense.categoryId
    })
    .then(expense => {
        return fn(Responses.EXPENSE_CREATED(expense));
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    })
}

Expense.updateExpense  = function(expense, fn) {
    Expense.update({
        amount : expense.amount,
        date : expense.date,
        description : expense.description,
        type : expense.type,
        userId : expense.userId,
        categoryId : expense.categoryId
    }, {
        where : {
            id : expense.id
        }
    })
    .then(expense => {
        if (expense)
            return fn(Responses.EXPENSE_UPDATED(expense));
        else
            return fn(Responses.NOK(''));
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    });
}

Expense.updateNote = function(note, expenseId, fn) {
    Expense.update({
        notes : note,
    }, {
        where : {
            id : expenseId
        }
    })
    .then(updated => {
        return fn(Responses.NOTE_UPDATED);
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    });
}

Expense.deleteExpense = function(id, fn) {
    Expense.destroy({
        where : {
            id : id
        }
    })
    .then(destroyed => {
        return fn(Responses.EXPENSE_DELETED);
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    });
}

Expense.getExpense = function(id, fn) {
    Expense.findOne({
        where : {
            id : id
        }
    })
    .then(expense => {
        if (expense)
            return fn(Responses.OK(expense));
        else
            return fn(Responses.UNKNOWN_EXPENSE);
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    });
}

Expense.getAllForUser = function(userId, fn) {
    Expense.findAll({
        where : {
            userId : userId
        }
    })
    .then(exponses => {
        return fn(Responses.OK(exponses));
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    });
}

Expense.getAllByUserAndCategory = function(userId, categoryId, fn) {
    Expense.findAll({
        where : {
            userId : userId,
            categoryId : categoryId
        }
    })
    .then(expenses => {
        return fn(Responses.OK(expenses));
    })
    .catch(error => {
        return fn(Responses.NOK(error.message));
    });
}

module.exports = function(db, DataType) {
    return Expense;
}