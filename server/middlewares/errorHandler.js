const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
    } else if (error.name === "CastError") {
        return res.status(400).json({ message: "Malformatted id" });
    }

    next(error);
};

module.exports = errorHandler;
