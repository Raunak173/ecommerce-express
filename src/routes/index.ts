import { Router } from "express";
import authRoutes from "./auth";

const rootRouter: Router = Router();

rootRouter.use('/auth',authRoutes)

export default rootRouter

//This is our rootrouter where we will be combining our all routes