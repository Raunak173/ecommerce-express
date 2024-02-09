import { User } from "@prisma/client";
import express from 'express'

declare module "express"{
    export interface Request{
        user: User
    }
}

//THis is a declaration module where we will add the User to the req we receive