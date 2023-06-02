import { Router } from "express";
import { login, logout, verifyForgetPassword, verifyUser } from "../controllers/AuthController.js";

const route = Router();

route.post("/login", login);
route.post("/logout", logout);
route.post("/verify_user", verifyUser);
route.post("/verify_username", verifyForgetPassword);

export default route;