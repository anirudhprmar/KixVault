import { useAuthStore } from "../../store/useAuthStore"
// import { useShopStore } from "../../store/useShopStore"

function Profile() {
  const {authUser} = useAuthStore()
  // const {getOrders,userPlacedOrders} = useShopStore()
  

  return (
    <div  >
      <div>
        {/* big profile pic */}
        <p className="text-2xl">Welcome! {authUser?.username}</p>
        <p className="border border-gray-900 w-fit p-1">{authUser?.email}</p>
      </div>
      {/* my orders: all the orders of user  */}
      <div>
        {/* {console.log(userPlacedOrders)} */}
        {/*  */}
        {/* {userPlacedOrders}  */}
      </div>
      {/* cart: just like sidebar but on the right and check out will be option in cart sidebar  */} 
      {/* wishlist : different page*/} 
    </div>
  )
}

export default Profile
