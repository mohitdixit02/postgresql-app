import express from "express";
const router = express.Router();
import {
    create_job,
    get_jobs,
    update_job,
    delete_job
} from "../controllers/jobs/jobs.mjs";

router.get('/get_jobs', get_jobs)
router.post('/create_job', create_job)
router.post('/update_job', update_job)
router.post('/delete_job', delete_job)

export default router;