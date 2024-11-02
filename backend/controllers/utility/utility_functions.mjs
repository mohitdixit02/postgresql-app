import { getUserModel } from "../../DB/Postgres/Models/Models.mjs";
import BadRequestError from "../../errors/BadError.mjs";
import jwt from 'jsonwebtoken';

// utility function
const userIDFromUserName = async (username) => {
    if (!username) {
        try {
            throw new BadRequestError("Invalid User");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    const userModel = getUserModel()
    try{
        const user = await userModel.findOne({
            where: {
                username: username
            }
        })
        return user.user_id;
    }
    catch (err) {
        try {
            throw new BadRequestError("Error occurred in an internal process");
        }
        catch (err) {
            next(err);
        }
        return;
    }
}

const generateJsonToken = (username, password) => {
    return jwt.sign(
        {
            username: username,
            password: password,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    )
}

// handle sequelize errors
const handleSequelizeError = (err, next, service) => {
    if (err.name === "SequelizeValidationError") {
        let message = err.message.replace("Validation error: ", "");
        try {
            throw new BadRequestError(message);
        }
        catch (err) {
            next(err);
        }
    }
    else {
        try {
            throw new BadRequestError(`Error while ${service}`);
        }
        catch (err) {
            next(err);
        }
    }
    return;
}

export { 
    userIDFromUserName,
    generateJsonToken,
    handleSequelizeError
};