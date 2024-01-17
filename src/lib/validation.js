const Validator = require('validatorjs')
const { ErrorHandler } = require('../middleware/errorMiddleware')

/**
 * Validate request body based on rules
 * @param {object} body - request body object
 * @param {object} rules - validatorjs rules object
 */
function validateBody(body, rules) {
    const issues = [];
    const validation = new Validator(body, rules);
    if (validation.fails()) {
        const errors = validation.errors.all();
        Object.values(errors).forEach((error) => {
            const errorItems = error.map(errorMessage => ({ message: errorMessage }));
            issues.push(...errorItems);
        });
    }
    if (issues.length > 0) {
        throw new ErrorHandler({ message: "Body validation failed.", statusCode: 400, issues })
    }
}

module.exports = { validateBody }
