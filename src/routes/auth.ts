import { Router  } from "express";  
import { login, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";

const authRoutes: Router = Router()

// authRoutes.post("/signup",signup)
authRoutes.post("/signup",errorHandler(signup))
//This is the best way to handle errors

authRoutes.post("/login",errorHandler(login))

export default authRoutes

//This is where we will have our authentication routes