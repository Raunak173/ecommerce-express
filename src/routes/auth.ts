import { Router  } from "express";  
import { login } from "../controllers/auth";

const authRoutes: Router = Router()

authRoutes.get("/login",login)

export default authRoutes

//This is where we will have our authentication routes