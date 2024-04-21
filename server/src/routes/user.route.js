import { Router } from "express";
import { newUserSignIn } from "../controllers/user.controller.js";


const router = Router();
console.log("router")
router.route("/newUserSignIn").post(newUserSignIn);

export default router;