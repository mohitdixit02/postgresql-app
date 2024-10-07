import { getTaskModel } from "../../DB/Postgres/Models/Models.mjs";
import { validate as isUuid } from 'uuid';
import BadRequestError from "../../errors/BadError.mjs";
import { userIDFromUserName } from "../utility/utility_functions.mjs";

// controller functions
const create_task = async (req, res, next) => {
    const {
        title,
        status
    } = req.body;

    const taskModel = getTaskModel();
    const user_id = await userIDFromUserName(req.user.username);

    const task = await taskModel.create({
        task_name: title,
        task_status: status,
        user_id: user_id
    });

    if (!task) {
        try {
            throw new BadRequestError("Error while creating task");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    else {
        res.send({
            "message": "Task created successfully",
            "title": task.task_name,
        });
    }
};

const get_tasks = async (req, res, next) => {
    const taskModel = getTaskModel();
    const user_id = await userIDFromUserName(req.user.username);

    const tasks = await taskModel.findAll({
        attributes: ['task_id', 'task_name', 'task_status'],
        where: {
            user_id: user_id
        }
    });

    if (!tasks) {
        try {
            throw new BadRequestError("Error while getting tasks");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    else {
        res.send(tasks);
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

    const task = await taskModel.update({
        task_status: status
    }, {
        where: {
            task_id: task_id,
            user_id: user_id
        }
    });

    if (!task) {
        try {
            throw new BadRequestError("Error while updating task");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    else {
        res.send({
            "message": "Task updated successfully",
        });
    }
};

const delete_task = async (req, res, next) => {
    const {
        task_id
    } = req.body;

    if(!isUuid(task_id)) {
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

    const task = await taskModel.destroy({
        where: {
            task_id: task_id,
            user_id: user_id
        }
    });
    if (!task) {
        try {
            throw new BadRequestError("Error while deleting task");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    else {
        res.send({
            "message": "Task deleted successfully",
        });
    }   
};

export {
    create_task,
    get_tasks,
    update_task,
    delete_task
};