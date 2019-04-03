const express = require('express');
const ExpenseRouter = express.Router();
const ExpenseController = require('./expense.controller');

ExpenseRouter.post('/create', ExpenseController.create);
ExpenseRouter.put('/update', ExpenseController.update);
ExpenseRouter.put('/updateNote', ExpenseController.updateNote);
ExpenseRouter.get('/get', ExpenseController.getExpense);
ExpenseRouter.get('/getForUser', ExpenseController.getAllByUser);
ExpenseRouter.get('/getAll', ExpenseController.getAllForUserWithCat);
ExpenseRouter.delete('/delete', ExpenseController.deleteById);

module.exports = ExpenseRouter;