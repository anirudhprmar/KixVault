import z from 'zod'

export const signupSchema = z.object({
    username:z.string().min(2),
    email:z.string().email(),
    password:z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    

})
export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
})

export const productSchema = z.object({
    title:z.string(),
    price:z.number(), // it works then cool , if it doesn't then make it string and then parse it into int / number
    description:z.string(),
    imageURL:z.string().optional(),
    stock:z.number(),
    category:z.array().string() // might be errorneous
})