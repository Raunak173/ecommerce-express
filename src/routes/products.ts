import { Router  } from "express";  
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

const productRoutes: Router = Router()

productRoutes.post('/create',[authMiddleware,adminMiddleware],errorHandler(createProduct))
//This middleware ensures that we need to pass jwttoken in the Authorization inside Headers
//adminMiddleware ensures that only admin can use it

productRoutes.put('/update/:id',[authMiddleware,adminMiddleware],errorHandler(updateProduct))
productRoutes.delete('/delete/:id',[authMiddleware,adminMiddleware],errorHandler(deleteProduct))
productRoutes.get('/',[authMiddleware],errorHandler(listProducts))
productRoutes.get('/:id',[authMiddleware],errorHandler(getProductById))


export default productRoutes
