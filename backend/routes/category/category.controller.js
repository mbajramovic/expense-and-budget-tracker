const db = require('../../base/base-connect');

const {Category} = db.import('../../base/models/Relations');
const AuthService = require('../../helpers/session');
const Responses = require('../../helpers/responses');

const CategoryController = (() => {
    const create = function(req, res) {
        var token = req.headers['x-access-token'];
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            var category = req.body.category;
            AuthService.verify(token)
            .then(user => {
                if (user.id == category.userId) {
                    Category.newCategory(category, (data) => {
                        res.end(JSON.stringify(data));
                    })
                }
                else {
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
                }
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            })
        }
    };

    const getAll = function(req, res) {
        var token = req.headers['x-access-token'];
        if (!token) {
            res.end(JSON.stringify(Responses.NO_TOKEN));
        }
        else {
            var userId = req.query.userId;
            AuthService.verify(token)
            .then(user => {
                if (user.id == userId) {
                    Category.getAll(userId, (data) => {
                        res.end(JSON.stringify(data));
                    })
                }
                else {
                    res.end(JSON.stringify(Responses.AUTHENTICATION_FAILED));
                }
            })
            .catch(error => {
                res.end(JSON.stringify(error));
            })
        }
    }

    return {
        create : create,
        getAll : getAll
    }
})();

module.exports = CategoryController;