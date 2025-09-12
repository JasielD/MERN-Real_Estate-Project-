import Listing from "../models/listing.model.js";

export const createListingController = async(req, res,next) => {
    try {
       const newListing = await Listing.create(req.body)
       return res.status(201).json(newListing)
    } catch (err) {
        next(err);
    }
}