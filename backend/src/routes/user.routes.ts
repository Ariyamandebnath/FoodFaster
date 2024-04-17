import express from "express";
import UserController from "../controllers/user.controller"
import { jwtCheck, jwtParse } from "../middleware/auth.middleware";
import { validateMyUserRequest } from "../middleware/validation.middleware";


const router = express.Router()

// /api/my/user
router.get("/", jwtCheck, jwtParse, UserController.getCurrentUser);
router.post("/", jwtCheck, UserController.createCurrentUser);
router.put(
    "/",
    jwtCheck,
    jwtParse,
    validateMyUserRequest,
    UserController.updateCurrentUser
);

export default router;
