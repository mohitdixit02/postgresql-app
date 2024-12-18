import express from "express";
const router = express.Router();
import {
    create_task,
    get_tasks,
    update_task,
    delete_task
} from "../controllers/tasks/tasks.mjs";

router.post('/create_task', create_task);
router.get('/get_tasks', get_tasks);
router.put('/update_task', update_task);
router.delete('/delete_task', delete_task);

export default router;