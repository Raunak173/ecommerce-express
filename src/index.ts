import express,{Express,Request,Response} from "express"
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";

const app: Express =  express();

app.use(express.json())
//This is very important line because it acts as a body parser

app.use('/api',rootRouter)
//This means that the url will be: /api/auth/login

//This is used inside the controllers to perform sql queries
export const prismaClient  = new PrismaClient(
    {
        log: ["query"]
    }
)


app.listen(PORT,()=>console.log("App working"))