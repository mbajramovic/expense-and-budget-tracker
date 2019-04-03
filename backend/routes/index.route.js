const express = require('express');
const AppRouter = express.Router();

const AuthRouter = require('./auth/auth.route');
const ExpenseRouter = require('./expense/expense.route');
const CategoryRouter = require('./category/category.route');

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/expense', ExpenseRouter);
AppRouter.use('/category', CategoryRouter);

module.exports = AppRouter;