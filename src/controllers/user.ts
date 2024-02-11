import { Request, Response } from "express";
import { addressSchema, updateUserSchema } from "../schemas/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { prismaClient } from "..";
import { Address, User } from "@prisma/client";
import { BadRequestException } from "../exceptions/bad-request";

export const addAddress = async(req: Request,res: Response)=>{
    addressSchema.parse(req.body);
    // let user:User
    // try {
    //     user = await prismaClient.user.findFirstOrThrow({
    //         where:{
    //             id: req.body.userId
    //         }
    //     })
    // } catch (error) {
    //     throw new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND)
    // }
    const address = await prismaClient.address.create({
        data:{
            ...req.body,
            userId: req.user.id
            //authmiddleware ensures that we will get the user id in req.user.id
        }
    })
    res.json(address)
}

export const deleteAddress = async(req: Request,res: Response)=>{
    try {
        await prismaClient.address.delete({
            where:{
                id: req.params.id as any
            }
        })
        res.json({success: true})
    } catch (error) {
        throw new NotFoundException("Address not found",ErrorCodes.ADDRESS_NOT_FOUND)
    }
}

export const listAddress = async(req: Request,res: Response)=>{
    const addresses = await prismaClient.address.findMany({
        where:{
            userId: req.user.id
        }
    })
    res.json(addresses)
}

export const updateUser = async(req:Request,res:Response)=>{
    const validatedData = updateUserSchema.parse(req.body)
    let shippingAddress: any
    let billingAddress: any
    if(validatedData.defaultShippingAddressId){
        try {
            shippingAddress = prismaClient.address.findFirstOrThrow({
                where:{
                    id: validatedData.defaultShippingAddressId as any
                }
            })
            
        } catch (error) {
            throw new NotFoundException("User not found",ErrorCodes.ADDRESS_NOT_FOUND)
        }
        if(shippingAddress.id!=req.user.id){
                throw new BadRequestException("Address does not belong to this user",ErrorCodes.ADDRESS_NOT_BELONG)
        }
    }
    if(validatedData.defaultBillingAddressId){
        try {
            billingAddress = prismaClient.address.findFirstOrThrow({
                where:{
                    id: validatedData.defaultBillingAddressId as any
                }
            })
            
        } catch (error) {
            throw new NotFoundException("User not found",ErrorCodes.ADDRESS_NOT_FOUND)
        }
        if(billingAddress.id!=req.user.id){
                throw new BadRequestException("Address does not belong to this user",ErrorCodes.ADDRESS_NOT_BELONG)
        }
    }
    const updatedUser = await prismaClient.user.update({
        where:{
            id: req.user.id
        },
        data: validatedData as any
    })
    res.json(updateUser)
}