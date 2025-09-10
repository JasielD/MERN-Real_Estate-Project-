import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const UserRouter = express.Router();

UserRouter.get("/", test );
UserRouter.post("/update/:id", verifyToken, updateUser)

export default UserRouter;