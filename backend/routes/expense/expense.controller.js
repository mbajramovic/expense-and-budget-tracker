const db = require('../../base/base-connect');

const {Expense} = db.import('../../base/models/Relations.js');
const Responses = require('../../helpers/responses');
const AuthService = require('../../helpers/session');

const ExpenseController = (() => {
    const create = (req, res) => {
        console.log(req.body);
        console.log(req.headers);
        var token = req.headers['x-access-token'];
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            AuthService.verify(token)
            .then(decoded => {
                var expense = req.body.expense;
                if (decoded.id == expense.userId) {
                    Expense.newExpense(expense, (data) => {
                        res.end(JSON.stringify(data));
                    });
                }
                else {
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
                }
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            });
        }
    };

    const update = (req, res) => {
        var token = req.headers['x-access-token'];
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            AuthService.verify(token)
            .then(decoded => {
                var expense = req.body.expense;
                if (decoded.id == expense.userId) 
                    Expense.updateExpense(expense, (data) => {
                        res.end(JSON.stringify(data));
                    });
                
                else
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            });
        }
    };

    const updateNote = (req, res) =>{
        var token = req.headers['x-access-token'];
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            AuthService.verify(token)
            .then(decoded => {
                var note = req.body.note;
                var userId = req.body.userId;
                var expenseId = req.body.expenseId;
                if (decoded.id == userId) 
                    Expense.updateNote(note, expenseId, (data) => {
                        res.end(JSON.stringify(data));
                    });
                
                else
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            });
        }
    }

    const getExpense = (req, res) => {
        var token = req.headers['x-access-token'];
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            AuthService.verify(token)
            .then(decoded => {
                var userId = req.query.userId;
                var id = req.query.id;
                if (decoded.id == userId) 
                    Expense.getExpense(id, (data) => {
                        res.end(JSON.stringify(data));
                    });
                 else 
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            });
        }
    };

    const getAllByUser = (req, res) => {
        var token = req.headers['x-access-token'];
        console.log(req);
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            AuthService.verify(token)
            .then(decoded => {
                var userId = req.query.userId;
                if (decoded.id == userId) 
                    Expense.getAllForUser(userId, (data) => {
                        res.end(JSON.stringify(data));
                    });
                else 
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            });
        }
    };

    const deleteById = (req, res) => {
        var token = req.headers['x-access-token'];
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            AuthService.verify(token)
            .then(decoded => {
                var id = req.query.id;
                var userId = req.query.userId;
                if (decoded.id == userId) 
                    Expense.deleteExpense(id, (data) => {
                        res.end(JSON.stringify(data));
                    });
                else 
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            });
        }
    };

    const getAllForUserWithCat = (req, res) => {
        var token = req.headers['x-access-token'];
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            AuthService.verify(token)
            .then(decoded => {
                var userId = req.query.userId;
                if (decoded.id == userId) 
                    Expense.getAllForUserWithCat(userId, (data) => {
                        res.end(JSON.stringify(data));
                    })
                else 
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            });
        }
    };

    return {
        create : create,
        update : update,
        deleteById : deleteById,
        getExpense : getExpense,
        getAllByUser : getAllByUser,
        getAllForUserWithCat : getAllForUserWithCat,
        updateNote : updateNote
    }
})();

module.exports = ExpenseController;