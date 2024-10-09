import { getJobModel } from "../../DB/Postgres/Models/Models.mjs";
import { validate as isUuid } from 'uuid';
import BadRequestError from "../../errors/BadError.mjs";
import { userIDFromUserName } from "../utility/utility_functions.mjs";

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

    const job = await jobModel.create({
        company_name: company_name,
        position: position,
        job_status: status,
        user_id: user_id
    });

    if (!job) {
        try {
            throw new BadRequestError("Error while creating job");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    else {
        res.send({
            "message": "Job created successfully",
        });
    }
};

const get_jobs = async (req, res, next) => {
    const jobModel = getJobModel();
    const user_id = await userIDFromUserName(req.user.username);

    const jobs = await jobModel.findAll({
        attributes: ['job_id','company_name', 'position', 'job_status'],
        where: {
            user_id: user_id
        }
    });

    if (!jobs) {
        try {
            throw new BadRequestError("Error while getting jobs");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    else {
        let jobs_response = {
            'all':[],
            'preparing':[],
            'interview':[],
            'selected':[],
            'rejected':[]
        };
        jobs.map((job) => {
            let status = job.job_status;
            jobs_response['all'].push(
                {
                    job_id: job.job_id,
                    company_name: job.company_name,
                    position: job.position,
                    status: status
                }
            );
            jobs_response[status.toLowerCase()].push({
                job_id: job.job_id,
                company_name: job.company_name,
                position: job.position,
                status: status
            })
        })
        res.send(jobs_response);
    }
};

const update_job = async (req, res, next) => {
    const {
        job_id,
        company_name,
        position,
        status
    } = req.body;

    const jobModel = getJobModel();

    if (!isUuid(job_id) || !status || !company_name || !position) {
        try {
            throw new BadRequestError("Invalid fields");
        }
        catch (err) {
            next(err);
        }
        return;
    }

    const user_id = await userIDFromUserName(req.user.username);

    const job = await jobModel.update({
        company_name: company_name,
        position: position,
        job_status: status
    }, {
        where: {
            job_id: job_id,
            user_id: user_id
        }
    });

    if (!job) {
        try {
            throw new BadRequestError("Error while updating job");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    else {
        res.send({
            "message": "job updated successfully",
        });
    }
};

const delete_job = async (req, res, next) => {
    const {
        job_id
    } = req.body;

    if(!isUuid(job_id)) {
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

    const job = await jobModel.destroy({
        where: {
            job_id: job_id,
            user_id: user_id
        }
    });
    if (!job) {
        try {
            throw new BadRequestError("Error while deleting job");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    else {
        res.send({
            "message": "Job deleted successfully",
        });
    }   
};

export {
    create_job,
    get_jobs,
    update_job,
    delete_job
};