import { getTaskModel } from "../../DB/Postgres/Models/Models.mjs";
import { validate as isUuid } from 'uuid';
import BadRequestError from "../../errors/BadError.mjs";
import { userIDFromUserName, handleSequelizeError } from "../utility/utility_functions.mjs";

// controller functions
const create_task = async (req, res, next) => {
    const {
        title,
        status
    } = req.body;

    const taskModel = getTaskModel();
    const user_id = await userIDFromUserName(req.user.username);

    if(!title || !status) {
        try {
            throw new BadRequestError("Title or status missing");
        }
        catch (err) {
            next(err);
        }
        return;
    }

    try {
        const task = await taskModel.create({
            task_name: title,
            task_status: status,
            user_id: user_id
        });

        res.send({
            "message": "Task created successfully",
            "title": task.task_name,
        });
    }
    catch (err) {
        handleSequelizeError(err, next, "creating task");
    }
};

const get_tasks = async (req, res, next) => {
    const taskModel = getTaskModel();
    const user_id = await userIDFromUserName(req.user.username);

    try {
        const tasks = await taskModel.findAll({
            attributes: ['task_id', 'task_name', 'task_status'],
            where: {
                user_id: user_id
            }
        });

        res.send(tasks);
    }
    catch {
        handleSequelizeError(err, next, "fetching tasks");
    }
};

const update_task = async (req, res, next) => {
    const {
        task_id,
        status
    } = req.body;

    const taskModel = getTaskModel();

    if (!isUuid(task_id) || !status) {
        try {
            throw new BadRequestError("Invalid task_id or status");
        }
        catch (err) {
            next(err);
        }
        return;
    }

    const user_id = await userIDFromUserName(req.user.username);

    try {
        await taskModel.update({
            task_status: status
        }, {
            where: {
                task_id: task_id,
                user_id: user_id
            }
        });

        res.send({
            "message": "Task updated successfully",
        });
    }
    catch (err) {
        handleSequelizeError(err, next, "updating task");
    }
};

const delete_task = async (req, res, next) => {
    const {
        task_id
    } = req.body;

    if (!isUuid(task_id)) {
        try {
            throw new BadRequestError("Invalid task id");
        }
        catch (err) {
            next(err);
        }
        return;
    }

    const taskModel = getTaskModel();
    const user_id = await userIDFromUserName(req.user.username);

    try {
        await taskModel.destroy({
            where: {
                task_id: task_id,
                user_id: user_id
            }
        });

        res.send({
            "message": "Task deleted successfully",
        });
    }
    catch(err){
        handleSequelizeError(err, next, "deleting task");
    }
};

export {
    create_task,
    get_tasks,
    update_task,
    delete_task
};