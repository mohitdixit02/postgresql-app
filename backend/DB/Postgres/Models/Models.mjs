// database setup
import { DataTypes, ValidationError } from 'sequelize';
import { Postgres } from '../Config/Config.mjs';
import bcrypt from 'bcrypt';

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
            validate: {
                is: {
                    args: /^[a-zA-Z0-9_]*$/g,
                    msg: "Username must contain only letters, numbers and underscores!"
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Name must not be empty!"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Email must be a valid email address!"
                }
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
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Task name must not be empty!"
                }
            }
        },
        task_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [["done", "not done"]],
                    msg: "Not a valid task status!"
                }
            }
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
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Company name must not be empty!"
                }
            }
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Position must not be empty!"
                }
            }
        },
        job_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [["selected", "rejected", "interview", "preparing"]],
                    msg: "Not a valid job status!"
                } 
            }
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
        if (user.password.length < 8) {
            throw new ValidationError('Password must be at least 8 characters long!');
        }
        else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(user.password) === false) {
            throw new ValidationError('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!');
        }
        else {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
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