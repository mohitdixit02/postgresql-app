// Auth Middleware
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/Unauthorized.mjs';

const auth_middleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth){
        try{
            throw new UnauthorizedError("Authorization header is missing");
        }
        catch(err){
            next(err);
        }
        return;
    }
    const token = auth.split(' ')[1];
    if(!token){
        try{
            throw new UnauthorizedError("Token is missing");
        }
        catch(err){
            next(err);
        }
        return;
    }

    // jwt token verification
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    }
    catch(err){
        try{
            throw new UnauthorizedError("Invalid Token");
        }
        catch(err){
            next(err);
        }
        return;
    }
    next();
};

export default auth_middleware;