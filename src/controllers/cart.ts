import { Request,Response } from "express";
import { CartSchema, changeQuantitySchema } from "../schemas/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { CartItem, Product } from "@prisma/client";
import { prismaClient } from "..";

export const adddItemToCart=async(req:Request,res: Response)=>{
    const validatedData = CartSchema.parse(req.body)
    let product: Product
    try {
      product = await prismaClient.product.findFirstOrThrow({
        where:{
            id: validatedData.productId
        }
      }) 
    } catch (error) {
        throw new NotFoundException("Product not found",ErrorCodes.PRODUCT_NOT_FOUND)
    }
    const cart: CartItem = await prismaClient.cartItem.create({
        data:{
            userId: req.user.id,
            productId: product.id,
            quantity: validatedData.quantity

        }
    })
    res.json(cart)
}

export const deleteItemFromCart = async(req:Request,res: Response)=>{
    await prismaClient.cartItem.delete({
        where:{
            id: req.params.id as any
        }
    })
    res.json({"success": true})
}

export const changeQuantity = async(req:Request,res:Response)=>{
    const validatedData  = changeQuantitySchema.parse(req.body)
    const updatedCart = await prismaClient.cartItem.update({
        where:{
            id: req.params.id as any
        },
        data:{
            quantity: validatedData.quantity
        }
    })
    res.json(updatedCart)
}

export const getCart = async(req:Request,res:Response)=>{
    const cart = await prismaClient.cartItem.findMany({
        where:{
            id: req.user.id
        },
        include:{
            product: true
        }
        //If there is product then only give cart
    })
    res.json(cart)
}