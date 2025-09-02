import express from 'express';
import { authController } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post("/signup",authController);

export default Router;  