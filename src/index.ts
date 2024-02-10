import express,{Express,Request,Response} from "express"
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";

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
// .$extends({
//     query:{
//         user:{
//             create({args,query}){
//                 args.data = SignUpSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// }
// )

//Now we need to extend the Prisma client to use our valiation schema
//To use it there is a fix boiler plate

//So what is happening is that i am extending the create method of the prisma client
//Create method taked two params args and query

app.use(errorMiddleware)
//This is an important line to be added to use error middleware for error handling

app.listen(PORT,()=>console.log("App working"))