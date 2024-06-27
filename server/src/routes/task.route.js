import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addNewTask, changeTaskStatus, deleteTask } from "../controllers/tasks.controller.js";

const router = Router();

router.route("/addNewTask").post(verifyJwt,addNewTask)
router.route("/deleteTask").post(verifyJwt,deleteTask)
router.route("/changeTaskStatus").post(verifyJwt,changeTaskStatus)
export default router;