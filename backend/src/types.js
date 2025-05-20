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