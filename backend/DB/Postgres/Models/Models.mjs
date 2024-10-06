// database setup
import { DataTypes } from 'sequelize';
import { Postgres } from '../Config/Config.mjs';

const Models = (sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false, 
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate:{
                isEmail: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    },
    {
        createdAt: false,
        updatedAt: false,  
        freezeTableName: true,
        paranoid: true,
    }
);

    sequelize.sync();
};

const getUserModel = () => {
    const sequelize = Postgres.client;
    const userModel = sequelize.models.users;
    return userModel;
}

export {getUserModel};
export default Models;