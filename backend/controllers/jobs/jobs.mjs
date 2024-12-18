import { getJobModel } from "../../DB/Postgres/Models/Models.mjs";
import { validate as isUuid } from 'uuid';
import BadRequestError from "../../errors/BadError.mjs";
import { userIDFromUserName, handleSequelizeError } from "../utility/utility_functions.mjs";
import { Op } from "sequelize";

// controller functions
const create_job = async (req, res, next) => {
    const {
        company_name,
        position,
        status
    } = req.body;

    if (!company_name || !position || !status) {
        try {
            throw new BadRequestError("Invalid or Missing Fields");
        }
        catch (err) {
            next(err);
        }
        return;
    }

    const jobModel = getJobModel();
    const user_id = await userIDFromUserName(req.user.username);

    try {
        await jobModel.create({
            company_name: company_name,
            position: position,
            job_status: status,
            user_id: user_id
        });

        res.send({
            "message": "Job created successfully",
        });
    }
    catch (err) {
        handleSequelizeError(err, next, "creating job");
    }
};

const get_jobs = async (req, res, next) => {
    const type = req.query.type;

    if (!type) {
        try {
            throw new BadRequestError("Invalid type");
        }
        catch (err) {
            next(err);
        }
        return;
    }

    const jobModel = getJobModel();
    const user_id = await userIDFromUserName(req.user.username);

    try{
        const jobs = await jobModel.findAll({
            attributes: ['job_id', 'company_name', 'position', 'job_status'],
            where: {
                user_id: user_id,
                job_status:
                    type !== "all" ? type
                        : {
                            [Op.not]: null
                        }
            },
            attributes: [
                'job_id',
                'company_name',
                'position',
                ['job_status', 'status']
            ]
        });

        res.send(jobs);
    }
    catch (err) {
        handleSequelizeError(err, next, "fetching jobs");
    } 
};

const update_job = async (req, res, next) => {
    const {
        job_id,
        changes
    } = req.body;

    const jobModel = getJobModel();

    if (!isUuid(job_id) || !changes || Object.keys(changes).length === 0) {
        try {
            throw new BadRequestError("Invalid fields");
        }
        catch (err) {
            next(err);
        }
        return;
    }

    const user_id = await userIDFromUserName(req.user.username);

    try{
        await jobModel.update(changes, {
            where: {
                job_id: job_id,
                user_id: user_id
            }
        });

        res.send({
            "message": "job updated successfully",
        });
    }
    catch (err) {
        handleSequelizeError(err, next, "updating job");
    }
};

const delete_job = async (req, res, next) => {
    const {
        job_id
    } = req.body;

    if (!isUuid(job_id)) {
        try {
            throw new BadRequestError("Invalid job id");
        }
        catch (err) {
            next(err);
        }
        return;
    }

    const jobModel = getJobModel();
    const user_id = await userIDFromUserName(req.user.username);

    try{
        await jobModel.destroy({
            where: {
                job_id: job_id,
                user_id: user_id
            }
        });

        res.send({
            "message": "Job deleted successfully",
        });

    }
    catch(err){
        handleSequelizeError(err, next, "deleting job");
    }
};

export {
    create_job,
    get_jobs,
    update_job,
    delete_job
};