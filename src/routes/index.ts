import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";

const rootRouter: Router = Router();

rootRouter.use('/auth',authRoutes)
rootRouter.use('/products',productRoutes)

export default rootRouter

//This is our rootrouter where we will be combining our all routes