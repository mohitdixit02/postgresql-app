import { getJobModel, getTaskModel } from "../../DB/Postgres/Models/Models.mjs";
import BadRequestError from "../../errors/BadError.mjs";
import { userIDFromUserName } from "../utility/utility_functions.mjs";
import { fn, Sequelize } from "sequelize";

const get_task_job_statistics = async (req, res, next) => {
    // getting models
    const jobModel = getJobModel();
    const taskModel = getTaskModel();

    // getting user id
    const user_name = req.user.username;
    const user_id = await userIDFromUserName(user_name);

    // getting tasks collection
    const tasks_collection = await taskModel.findAll({
        attributes: [
            'task_status',
            [Sequelize.fn('COUNT', Sequelize.col('task_status')), 'task_count']
        ],
        where: {
            user_id: user_id
        },
        group: ['task_status'],
    });

    // getting jobs collection
    const jobs_collection = await jobModel.findAll({
        attributes: [
            'job_status',
            [Sequelize.fn('COUNT', Sequelize.col('job_status')), 'job_count']
        ],
        where: {
            user_id: user_id
        },
        group: ['job_status'],
    });

    // final_response
    const final_response = {
        'tasks done': 0,
        'tasks not done': 0,
        'jobs selected': 0,
        'jobs rejected': 0,
        'jobs interview': 0,
        'jobs preparing': 0,
    };
    let total_tasks = 0;
    let total_jobs = 0;

    // adding tasks info
    for (let i of tasks_collection) {
        final_response[`tasks ${i.dataValues.task_status}`] = i.dataValues.task_count;
        total_tasks += parseInt(i.dataValues.task_count);
    }

    // adding jobs info
    for (let i of jobs_collection) {
        final_response[`jobs ${i.dataValues.job_status}`] = i.dataValues.job_count;
        total_jobs += parseInt(i.dataValues.job_count);
    }

    final_response['total_tasks'] = total_tasks;
    final_response['total_jobs'] = total_jobs;

    // adding % tasks completion
    let percentage_tasks_completed = total_tasks == 0 ? 0 : ((parseInt(final_response["tasks done"]) / total_tasks) * 100).toFixed(2);
    final_response['percentage_tasks_completed'] = percentage_tasks_completed;

    // adding hours left
    let current_hour = new Date().getHours();
    let hours_left = 23 - current_hour;
    final_response['hours_left'] = hours_left;

    res.send(final_response);
};

export {
    get_task_job_statistics
};