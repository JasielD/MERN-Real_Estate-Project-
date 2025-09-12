import express from "express";
import { createListingController } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const ListingRouter = express.Router();

ListingRouter.post("/create", verifyToken,createListingController);

export default ListingRouter;