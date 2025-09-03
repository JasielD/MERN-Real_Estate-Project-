import express from 'express';
import {signinController,signupController } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post("/signup",signupController);
Router.post("/signin",signinController);

export default Router;  