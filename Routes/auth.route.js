import express from 'express';
import multer from "multer";
import path from "path";
import {googleController, signinController,signupController,handleUploadedImage } from '../controllers/auth.controller.js';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const Router = express.Router();

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 300, height: 300, crop: "fill" }] // optional resize
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    // allow only images
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  }
});

Router.post("/signup",signupController);
Router.post("/signin",signinController);
Router.post("/google",googleController);
Router.post("/upload", upload.single("image"), handleUploadedImage);


export default Router;  