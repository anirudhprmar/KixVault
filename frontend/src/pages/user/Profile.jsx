import { useAuthStore } from "../../store/useAuthStore"

function Profile() {
  const {authUser} = useAuthStore()

  return (
    <div  >
      {/* a few user details */}
      {/* my orders option */}
      {/* cart  */}
      {/* wishlist */}
      <div className="bg-green-900 text-4xl text-gray-50 text-center">
        hi there {authUser.username}
      </div>
    </div>
  )
}

export default Profile
