import { get } from "mongoose";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListingController = async(req, res,next) => {
    try {
       const newListing = await Listing.create(req.body)
       return res.status(201).json(newListing)
    } catch (err) {
        next(err);
    }
}

export const deleteListingController = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id)   
    if(!listing){
        return next(errorHandler(404,"Listing not found"))
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,"You can only delete your own listing "))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("Listing has been deleted")
    } catch (err) {
        next(err)
    }
}

export const updateListingController = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404,"Listing not found"))
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,"You can only update your own listing"))
    }
    try {
       const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
       res.status(200).json(updatedListing)
        } catch (err) {
        next(err)
    }
}

export const getListingController = async(req,res,next)=>{
    try {
        const getListing = await Listing.findById(req.params.id)
        if(!getListing){
            next(errorHandler(404,"Listing not found"))
        }
        res.status(200).json(getListing)
    } catch (err) {
        next(err)
    }
}