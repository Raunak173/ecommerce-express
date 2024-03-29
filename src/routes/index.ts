import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import userRoutes from "./users";
import cartRoutes from "./cart";

const rootRouter: Router = Router();

rootRouter.use('/auth',authRoutes)
rootRouter.use('/products',productRoutes)
rootRouter.use('/user',userRoutes)
rootRouter.use('/cart',cartRoutes)

export default rootRouter

//This is our rootrouter where we will be combining our all routes