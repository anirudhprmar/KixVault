import { useState } from "react"
import { useNavigate, Link } from 'react-router';
import {useForm} from 'react-hook-form'
import {useAuthStore} from '../store/useAuthStore'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Eye,EyeOff,MoveRight} from 'lucide-react'

function Login() {
    const navigate = useNavigate()
  const [showPassword,setShowPassword] = useState(false);
  
  
  const {login,isLoggingIn} = useAuthStore()

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
   const req = login(data);
   if (req) {
    navigate('/')
   }
  }
  return (
    <div>

      <Navbar/>

      <main className="min-h-full">

        <section>
          <div className="text-center text-3xl pt-10 font-bold">Login</div>
        </section>
        
        <section>
          <form onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-3 py-40  justify-center items-center'
          >
            <div className='flex flex-col  gap-1 xl:w-xl'>
              <label htmlFor="email" className='text-2xl'>Email</label>
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

            <div className='flex flex-col gap-1 xl:w-xl relative'>
              <label htmlFor="password" className='text-2xl'>Password</label>
              <input
                name="password"
                type={ showPassword ? "text" : "password"}
                placeholder="*******
                "
                {...register("password")}
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                transition-all duration-300 hover:border-[#030303]'
              />
              <button
              className=' absolute right-4 top-[60%]  cursor-pointer'
              onClick={()=> setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff/> : <Eye/>}
              </button>
            </div>


      <button type="submit" disabled={isLoggingIn}>
        {isLoggingIn ?  <LoaderCircle size={4} className=' animate-spin'/> : <div className='w-full bg-[#030303] rounded-xl py-2 mt-3 xl:w-xl cursor-pointer'>
          <span className='flex gap-3 text-2xl items-center justify-center text-white '>Login <MoveRight/> </span>
        </div>}
      </button>

            <div className='flex gap-2 justify-between xl:w-xl'>
              <p>Don't have an account?</p>
                  
              <Link to={'/register'} className='text-[##030303]'>Register Here</Link> 
            </div>
        
          </form>
        </section>
      </main>

      <Footer/>
    </div>
  )
}

export default Login
