import { Router  } from "express";  
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import { adddItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart";

const cartRoutes: Router = Router()

cartRoutes.post('/add',[authMiddleware,adminMiddleware],errorHandler(adddItemToCart))
cartRoutes.put('/update/quantity/:id',[authMiddleware,adminMiddleware],errorHandler(changeQuantity))
cartRoutes.delete('/delete/:id',[authMiddleware,adminMiddleware],errorHandler(deleteItemFromCart))
cartRoutes.get('/',[authMiddleware],errorHandler(getCart))


export default cartRoutes
