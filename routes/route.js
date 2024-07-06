import express from "express";
import { register } from "../controllers/usercontroller.js";
import { login } from "../controllers/usercontroller.js";
import { logout } from "../controllers/usercontroller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
