import express from "express";
const router = express.Router();
import {
    login_user,
    register_user
}
from "../controllers/auth/auth.mjs";

router.post('/login', login_user);
router.post('/register', register_user);

export default router;