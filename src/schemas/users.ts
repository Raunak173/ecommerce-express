//Over here we are going to perform validations related to our user

import {z} from 'zod'

//Using zod library to add our api form validations

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})