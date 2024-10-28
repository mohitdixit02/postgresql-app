import express from "express";
const router = express.Router();
import { get_task_job_statistics } from "../controllers/dashboard/dashboard.mjs";

router.get('/get_task_job_statistics', get_task_job_statistics);

export default router;