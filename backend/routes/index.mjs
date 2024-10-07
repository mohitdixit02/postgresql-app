import express from "express";
import job_router from "./jobs.mjs";
import task_router from "./tasks.mjs";
import auth_router from "./auth.mjs";
import auth_middleware from "../middleware/auth_verify.mjs";
import error_middleware from "../middleware/error_middleware.mjs";

const router = express.Router();

// auth route
router.use("/api/auth", auth_router);

// check auth using middleware
router.use(auth_middleware);

// data routes
router.use("/api/jobs", job_router);
router.use("/api/tasks", task_router);

// error handling middleware
router.use(error_middleware);

export default router;