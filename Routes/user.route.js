import express from 'express';
import { deleteUser, test, updateUser,getUserListings, getUserController } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const UserRouter = express.Router();

UserRouter.get("/", test );
UserRouter.put("/update/:id", verifyToken, updateUser)
UserRouter.delete("/delete/:id", verifyToken, deleteUser)
UserRouter.get("/listings/:id",verifyToken, getUserListings)
UserRouter.get("/:id",verifyToken,getUserController)

export default UserRouter;