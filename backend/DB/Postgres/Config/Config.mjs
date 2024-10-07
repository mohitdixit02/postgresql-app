import {Sequelize } from 'sequelize';
import Models from "../Models/Models.mjs";
import dotenv from 'dotenv';

// loading env
dotenv.config();

// credentials
const Postgres = {
    credentials :{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,

        // for dev only
        logging: false
    },
    client : null
}

function connectDB(){
    console.log('Connecting to the database...');
    const sequelize = new Sequelize(Postgres.credentials);
    try{
        sequelize.authenticate().then(()=>{
            console.log('Connection has been established successfully.');

            // Initializing if models do not exist
            Models(sequelize);
        })
        return sequelize;
    }
    catch(error){
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDB;
export {Postgres};
