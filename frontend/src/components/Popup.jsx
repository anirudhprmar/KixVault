import { useEffect, useState } from "react"
import { Link } from "react-router"

function Popup() {

  const [isOpen,setIsOpen] = useState(false)

  useEffect(() => {
    // Check if popup has been shown before
    const hasPopupBeenShown = localStorage.getItem('popupShown')

    if (!hasPopupBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        // Set flag in localStorage
        localStorage.setItem('popupShown', 'true')
      }, 3000) // Show after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [])
    
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
    {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}></button> */}

    {isOpen && <dialog open={isOpen} className="modal">
      <div className="modal-box min-w-fit ">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setIsOpen(false)}>✕</button>
        </form>

        <div className='flex flex-1 justify-center '>

        <div className="w-fit ">
        <img src="../images/popupSneaker.jpeg" alt="sneaker" className='h-150  rounded-xl object-cover' />
        </div>

        <div className="px-4 max-w-1/2 ">
            <div className="w-fit pb-5 text-left ">
                <p className="font-bold text-2xl pt-6 pb-5"> Register Now & Unlock Exclusive Offers! </p>
                <p className="font-semibold text-lg w-fit pb-6 ">Sign up today to access special discounts, early-bird deals, and VIP rewards. 🎁
                </p>
                <p className="font-semibold text-lg w-fit">Don't miss out—register now and start saving! ✅ </p>
            </div>
            <div className="text-left">
                <Link to={'/register'} className="border border-gray-900 rounded-lg p-1 text-lg">Join Now</Link>
            </div>
        </div>
      </div>

      </div>
    </dialog>}
    </div>
  )
}

export default Popup
