import express from "express";
import { createListingController,deleteListingController } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const ListingRouter = express.Router();

ListingRouter.post("/create", verifyToken,createListingController);
ListingRouter.delete("/delete/:id",verifyToken,deleteListingController);

export default ListingRouter;