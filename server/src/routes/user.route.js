import { Router } from "express";
import { existingUserLogin, newUserSignIn, userLogOut } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();
router.route("/newUserSignIn").post(newUserSignIn);
router.route("/existingUserLogin").post(existingUserLogin);
router.route("/logOut").post(verifyJwt, userLogOut);

export default router;