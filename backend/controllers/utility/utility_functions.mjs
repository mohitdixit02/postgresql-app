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
    const user = await userModel.findOne({
        where: {
            username: username
        }
    })
    return user.user_id;
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

export { 
    userIDFromUserName,
    generateJsonToken 
};