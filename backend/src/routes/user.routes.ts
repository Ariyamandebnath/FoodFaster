import express from "express";
import {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
} from "../controllers/user.controller"
import { jwtCheck, jwtParse } from "../middleware/auth.middleware";
import { validateMyUserRequest } from "../middleware/validation.middleware";


const router = express.Router()

// /api/my/user
router.get("/", jwtCheck, jwtParse, getCurrentUser);
router.post("/", jwtCheck, createCurrentUser);
router.put(
    "/",
    jwtCheck,
    jwtParse,
    validateMyUserRequest,
    updateCurrentUser
);

export default router;
