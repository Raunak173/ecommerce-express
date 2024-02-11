import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/user";

const userRoutes: Router = Router()

userRoutes.post('/address/add',[authMiddleware],errorHandler(addAddress))
userRoutes.delete('/address/delete/:id',[authMiddleware],errorHandler(deleteAddress))
userRoutes.get('/address',[authMiddleware],errorHandler(listAddress))
userRoutes.put('/update',[authMiddleware],errorHandler(updateUser))

export default userRoutes