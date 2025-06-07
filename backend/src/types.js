import z from 'zod'

export const signupSchema = z.object({
    username:z.string(),
    email:z.string().email().toLowerCase().trim(),
    password: z.string().regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least 8 characters, one letter, one number and one special character'
    ),
    

})
export const loginSchema = z.object({
    email:z.string().email().toLowerCase().trim(),
     password: z.string().regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least 8 characters, one letter, one number and one special character'
    )
})

export const productSchema = z.object({
    name:z.string(),
    brand:z.string(),
    price:z.number(), // it works then cool , if it doesn't then make it string and then parse it into int / number
    description:z.string(),
    imageUrl:z.string(),
    sizes:z.array(z.number()),
    stock:z.number(),
    category:z.array(z.string() )// might be errorneous
})