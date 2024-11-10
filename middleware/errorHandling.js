const {constants} = require("../constants")
const errHandler = (err,req,res,next)=>{
    const statusCode = req.status?req.status:500;
    if(req.status) console.log(req.status)
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title: "validation failed",titmessage: err.message, stackT: err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({title: "Not Found",titmessage: err.message, stackT: err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized",titmessage: err.message, stackT: err.stack})
            break;
        case constants.FORBIDDEN:
            res.json({title: "Forbidden",titmessage: err.message, stackT: err.stack})
            break;
        case constants.SERVER_ERR:
            res.json({title: "server error",titmessage: err.message, stackT: err.stack})
            break;
        default:
            console.log(`The status is ${statusCode}, No errors!`);
            break;
    }
}
module.exports=errHandler;