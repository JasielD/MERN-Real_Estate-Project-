import express from 'express';
import {googleController, signinController,signupController } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post("/signup",signupController);
Router.post("/signin",signinController);
Router.post("/google",googleController);

export default Router;  