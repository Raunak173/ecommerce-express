//Over here we are going to perform validations related to our user

import {z} from 'zod'

//Using zod library to add our api form validations

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const addressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().nullable(),
    pincode: z.string().length(6),
    city: z.string(),
    country: z.string(),
    // userId: z.number()
})

export const updateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddressId: z.number().optional(),
    defaultBillingAddressId : z.number().optional()
})