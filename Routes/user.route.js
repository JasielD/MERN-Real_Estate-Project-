import express from 'express';
import { test } from '../controllers/user.controller.js';

const Router = express.Router();

Router.get("/", test );

export default Router;