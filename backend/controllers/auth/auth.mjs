import { where } from "sequelize";
import { getUserModel } from "../../DB/Postgres/Models/Models.mjs";
import BadRequestError from "../../errors/BadError.mjs";
import UnauthorizedError from "../../errors/Unauthorized.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login_user = async (req, res, next) => {
    const userModel = getUserModel();
    const { username, password } = req.body;
    
    if(!username || !password){
        try{
            throw new BadRequestError("Username or password is missing");
        }
        catch(err){
            next(err);
        }
        return;
    }

    const user = await userModel.findOne({
        where: {
            username: username,
        }
    });

    if (!user) {
        try{
            throw new BadRequestError("User doest not exist");
        }
        catch(err){
            next(err);
        }
        return;
    }

    const user_password = user.password;    
    const isMatch = await bcrypt.compare(password, user_password);

    if(isMatch){
        const token = jwt.sign(
            {
                username: user.username,
                password: user.password,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        )
        res.send({
            "message":'User login successfully',
            "name": user.name,
            "token": token
        });
    }
    else{
        try{
            throw new UnauthorizedError("Invalid Credentials");
        }
        catch(err){
            next(err);
        }
        return;
    }
};

const register_user = async (req, res, next) => {
    const {
        name,
        username,
        password,
        email,
    } = req.body;
    
    const userModel = getUserModel();
    
    const user = await userModel.findOne({
        where: {
            username: username,
        }
    })
    
    if(user){
        try{
            throw new BadRequestError("User already exists");
        }
        catch(err){
            next(err);
        }
        return;
    }
    else{
        const new_user = await userModel.create({
            name: name,
            username: username,
            password: password,
            email: email
        });

        if(!new_user){
            try{
                throw new BadRequestError("Error while registering User");
            }
            catch(err){
                next(err);
            }
            return;
        }
        else{
            res.send({
                "message": "User registered successfully",
                "name": new_user.name,
                "username": new_user.username,
            });
        }
    }
}

export {
    login_user,
    register_user,
};