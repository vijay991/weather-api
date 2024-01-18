const { ErrorHandler } = require("../middleware/errorMiddleware");

const asyncHandler = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return next(error);
        }
        next(new ErrorHandler(error));
    }
};

module.exports = { asyncHandler }