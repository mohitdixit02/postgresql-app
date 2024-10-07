// database setup
import { DataTypes } from 'sequelize';
import { Postgres } from '../Config/Config.mjs';
import bcrypt, { hash } from 'bcrypt';

const Models = (sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            updatedAt: false,
            deletedAt: false,
            freezeTableName: true,
        }
    );

    const tasks = sequelize.define("tasks", {
        task_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        task_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        task_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            updatedAt: false,
            deletedAt: false,
            freezeTableName: true,
        }
    );

    const jobs = sequelize.define("jobs", {
        job_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            updatedAt: false,
            deletedAt: false,
            freezeTableName: true,
        }
    );

    // password hashing
    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    });

    User.hasMany(tasks, { foreignKey: 'user_id' });
    User.hasMany(jobs, { foreignKey: 'user_id' });
    tasks.belongsTo(User, { foreignKey: 'user_id' });
    jobs.belongsTo(User, { foreignKey: 'user_id' });

    sequelize.sync();
};

const getUserModel = () => {
    const sequelize = Postgres.client;
    const userModel = sequelize.models.users;
    return userModel;
}

const getTaskModel = () => {
    const sequelize = Postgres.client;
    const taskModel = sequelize.models.tasks;
    return taskModel;
}

const getJobModel = () => {
    const sequelize = Postgres.client;
    const jobModel = sequelize.models.jobs;
    return jobModel;
}

export { getUserModel, getTaskModel, getJobModel };
export default Models;