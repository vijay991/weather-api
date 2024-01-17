const { validationResult } = require('express-validator');
const { ErrorHandler } = require('../middleware/errorMiddleware');


// Validation middleware to handle input validation
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        throw new ErrorHandler({ errors: errors.array(), statusCode: 422 })
    };
};

module.exports = validate;
