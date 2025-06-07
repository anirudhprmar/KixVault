import { Link, useNavigate } from "react-router"
import { useAuthStore } from "../store/useAuthStore"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Footer from "../components/Footer"
import {Eye,EyeOff,MoveRight} from 'lucide-react'
import Navbar from '../components/Navbar'

function Register() {
const navigate = useNavigate()
  const {signup,isSigningUp} = useAuthStore()
  const {register, handleSubmit} = useForm()
  const [showPassword,setShowPassword] = useState(false)

  const onSubmit = (data)=>{
    const req = signup(data);
   if (req) {
    navigate('/profile')
   }
  }


  return (
    <div>
      <Navbar/>

     <main>
      <section>
        <div className="text-center text-3xl pt-10 font-bold">Register</div>
      </section>
      <section>
          <form onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col py-40 gap-3 justify-center items-center'
          >
            <div className='flex flex-col gap-1 xl:w-xl'>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="John Doe"
                {...register("username")}
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                transition-all duration-300 hover:border-[#030303]'
              />
            </div>

            <div className='flex flex-col gap-1 xl:w-xl'>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
                {...register("email")}
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                transition-all duration-300 hover:border-[#030303]'
              />
            </div>

            <div className='flex flex-col gap-1 xl:w-xl relative '> 
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="*******
                "
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                transition-all duration-300 hover:border-[#030303]  '
                {...register("password")}
              />
              <button
              className=' absolute right-4 top-1/2 cursor-pointer'
              onClick={(e)=>  {
                e.preventDefault()
                setShowPassword(!showPassword)
              }}
              > 
                {showPassword ? <EyeOff/> : <Eye/>}
              </button>
            </div>


            <button type="submit" disabled={isSigningUp}>
              {isSigningUp ?  <LoaderCircle size={4} className=' animate-spin'/> : <div className='w-full bg-[#030303] rounded-xl py-2 mt-3 xl:w-xl cursor-pointer'>
                <span className='flex gap-3 text-2xl items-center justify-center text-white '>Sign up <MoveRight/> </span>
              </div>}
            </button>

            <div className='flex gap-2 justify-between xl:w-xl'>
              <p>Already have an account?</p>
              <Link to={'/login'} className='text-[#030303]'>Login Here</Link>
            </div>
          </form>
      </section>
        </main>

        <Footer/>
    </div>
  )
}

export default Register
