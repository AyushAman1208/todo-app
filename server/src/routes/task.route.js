import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addNewTask, deleteTask } from "../controllers/tasks.controller.js";

const router = Router();

router.route("/addNewTask").post(verifyJwt,addNewTask)
router.route("/deleteTask").post(verifyJwt,deleteTask)
export default router;