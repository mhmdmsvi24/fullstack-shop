import express from "express";
import { login, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);

// Admin
// authRouter.route("/").get(getUsers).post(createUser)
// authRouter.route("/:id").get(getUserByID).patch(updateUserbyID).delete(deleteUserByID)

export default authRouter;
