const Responses = {
    OK : (data) => {
        return {
            statusCode : 200,
            message : 'OK',
            data : data
        }
    },

    NOK : (data) => {
        return {
            statusCode : 2,
            message : 'Some error ocured.',
            data : data
        }
    },

    UNKNOWN_USER : {
        statusCode : 400,
        message : 'Username or password are incorrect.'
    },

    USER_REGISTERED : (data) => {
        return {
            statusCode : 200,
            message : 'Successfuly registered.',
            data : data
        }
    },

    USER_ALREADY_EXISTS : {
        statusCode : 400,
        message : 'User with this username already exists.'
    },

    SAME_CATEGORY_NAME : {
        statusCode : 400,
        message : 'Category with this name is already defined.'
    },

    CATEGORY_DEFINED : (data) => {
        return {
            statusCode : 200,
            message : 'Successfuly defined.',
            data : data
        }
    },

    EXPENSE_CREATED : (data) => {
        return {
            statusCode : 200,
            message : 'Successfuly created.',
            data : data
        }
    },

    EXPENSE_DELETED : {
        statusCode : 200,
        message : 'Successfuly deleted.'
    },

    EXPENSE_UPDATED :(data) => {
        return {
            statusCode : 200,
            message : 'Successfuly updated.',
            data : data
        }
    },

    NOTE_UPDATED : {
        statusCode : 200,
        message : "Successfuly updated."
    },

    UNKNOWN_EXPENSE : {
        statusCode : 400,
        message : 'Expense doesn\'t exist.'
    },

    NO_TOKEN : {
        statusCode : 401,
        message : 'No token provided.'
    },

    AUTHENTICATION_FAILED : {
        statusCode : 500,
        message : 'Authentication failed.'
    } 
}

module.exports = Responses;