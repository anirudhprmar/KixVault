import { ShoppingCart ,Heart, User2, LogOutIcon} from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect, useRef, useState } from "react"

function AuthNavbar() {
  const navigate=useNavigate()
 const {authUser,logout}  = useAuthStore()
 const firstLetterUser = authUser.username[0]
 const dropRef = useRef(null)
 
 const[dropOpen,setDropOpen] = useState(false)
 
 useEffect(()=>{
   const handleClickOutside = (e)=>{
     if (!dropRef.current.contains(e.target)) {
       setDropOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  },[dropOpen])
  
  
  
  
  return (
    <header className="sticky w-full top-0 left-0 right-0 z-100 ">
      <div className="bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto p-4">
          <nav className="flex justify-between items-center">
          <div className="text-center text-2xl font-bold cursor-pointer" onClick={()=>navigate('/')}>KixVault</div>
            <ul className="flex gap-8 pt-2 items-center ">
             <li className="w-12 aspect-square  font-light cursor-pointer hover:text-gray-600 transition-colors flex items-center justify-center rounded-full border border-gray-950">
            
                <div className={authUser.isAdmin ? "w-8 text-4xl px-1 text-center flex gap-10" : "w-8 rounded-full text-3xl text-center "} onClick={()=>setDropOpen(!dropOpen)}>
                {firstLetterUser}
                
                {authUser.isAdmin && <div className=" flex flex-col ">
                  <span className="font-bold text-lg right-0 top-0">{authUser.username}</span>
                  <span className="font-light text-sm">Admin</span>
                  </div>}

                </div>
                
              {dropOpen && (
                <ul tabIndex={0} className=" absolute right-25 top-9 menu menu-sm dropdown-content mt-10 px-2 shadow bg-base-100 rounded-box w-fit" ref={dropRef}>
               
                <li>
                  <Link to="/profile">
                    <User2 className="size-4" />
                    Profile
                  </Link>
                </li>
               
                <li>
                  <button onClick={logout} className="text-error">
                    <LogOutIcon className="size-4" />
                    Logout
                  </button>
                </li>
                </ul>
              )}
            </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default AuthNavbar