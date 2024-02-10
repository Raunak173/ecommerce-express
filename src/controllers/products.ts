import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const createProduct = async(req:Request,res:Response,next: NextFunction)=>{
    const product = await prismaClient.product.create({
        //['electronics','mobile'] = 'electronics,mobile'
        data:{
            ...req.body,
            tags: req.body.join(',')
        }
    })
    res.json(product)
}

export const updateProduct = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const product = req.body
        if(product.tags){
            product.tags = product.tags.joim(',')
        }
        const updateProduct = await prismaClient.product.update({
            where:{
                id : parseInt(req.params.id)
            },
            data: product
        })
        res.json(updateProduct)
    } catch (error) {
        throw new NotFoundException("Product not found",ErrorCodes.PRODUCT_NOT_FOUND)
    }
}

export const deleteProduct = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await prismaClient.product.delete({
            where:{
                id: req.params.id as any
            }
        })
    } catch (error) {
         throw new NotFoundException("Product not found",ErrorCodes.PRODUCT_NOT_FOUND)
    }
}

export const listProducts = async(req:Request,res:Response,next:NextFunction)=>{
    //Here we will also add pagination
    const count = await prismaClient.product.count()
    const products = await prismaClient.product.findMany({
        skip: req.query.skip as any || 0 , //?skip=5 will skip 5 products
        take: 5 //Show by default 5 products
    })
    res.json({
        count,
        data: products
    })
}

export const getProductById = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where:{
                id: req.params.id as any
            }
        })
        res.json(product)
    } catch (error) {
        throw new NotFoundException("Product not found",ErrorCodes.PRODUCT_NOT_FOUND)
    }
}