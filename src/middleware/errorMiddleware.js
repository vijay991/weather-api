class ErrorHandler extends Error {
    constructor({ message = 'Internal Server Error', statusCode = 500, issues = [] } = {}) {
        super(message);
        this.statusCode = statusCode;
        this.issues = issues;
    }
}

const errorMiddleware = (err, _, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(err)
    }

    const response = {
        success: false,
        message: err.message,
    };
    if (err.issues && err.issues.length > 0) {
        response.issues = err.issues;
    }

    return res.status(err.statusCode).json(response);

}
module.exports = { errorMiddleware, ErrorHandler }