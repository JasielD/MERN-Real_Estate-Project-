import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const UserRouter = express.Router();

UserRouter.get("/", test );
UserRouter.put("/update/:id", verifyToken, updateUser)
UserRouter.delete("/delete/:id", verifyToken, deleteUser)

export default UserRouter;