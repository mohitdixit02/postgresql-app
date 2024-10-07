import CustomError from "../errors/CustomError.mjs";

const error_middleware = (err, req, res, next) => {
    if(err instanceof CustomError){
        res.status(err.status).send(err.message);
    }
    else{
        res.status(500).send("Internal Server Error");
    }
}

export default error_middleware;