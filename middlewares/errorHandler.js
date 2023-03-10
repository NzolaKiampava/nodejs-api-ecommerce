//not found

const notFound = (req, res, next) => {
    const error = new Error(`Not found : ${req.originalUrl}`)
    res.status(404)
    next(error)
}

//Error Handler

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode==200 ? 500 : res.statusCode;
    res.status(statuscode)
    res.json({
        message: err?.message, //The ?. operator used in this code is called the "optional chaining" operator. It allows you to access properties of an object without causing an error if the object is null or undefined
        stack: err?.stack,
    })
}

module.exports = { errorHandler, notFound };