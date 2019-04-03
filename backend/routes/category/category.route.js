const express = require('express');
const CategoryRouter = express.Router();
const CategoryController = require('./category.controller');

CategoryRouter.post('/create', CategoryController.create);
CategoryRouter.get('/getAll', CategoryController.getAll);

module.exports = CategoryRouter;