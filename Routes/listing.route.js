import express from "express";
import { createListingController,deleteListingController,getListingController,getOneListingController,updateListingController } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const ListingRouter = express.Router();

ListingRouter.post("/create", verifyToken,createListingController);
ListingRouter.delete("/delete/:id",verifyToken,deleteListingController);
ListingRouter.put("/update/:id",verifyToken,updateListingController);
ListingRouter.get("/get/:id", getOneListingController)
ListingRouter.get("/get",getListingController)

export default ListingRouter;