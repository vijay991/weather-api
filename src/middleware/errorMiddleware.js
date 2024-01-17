class ErrorHandler extends Error {
    constructor({ message, statusCode, issues = [] } = error) {
        super(message)
        this.statusCode = statusCode
    }
}

const errorMiddleware = (err, _, res, next) => {
    err.message = err.message || 'Internal server Error.'
    err.statusCode = err.statusCode || 500

    if (process.env.NODE_ENV === 'development') {
        console.error(err)
    }

    const response = {
        success: false,
        message: err.message,
    };

    return res.status(err.statusCode).json(response);

}
module.exports = { errorMiddleware, ErrorHandler }