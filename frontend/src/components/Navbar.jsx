import { Menu } from "lucide-react"

function Navbar() {
  return (
    <header className="fixed w-full top-0 left-0 right-0 z-100">
      <div className="bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto p-4">
          <nav className="flex justify-between items-center">
          <div className="text-center text-2xl font-bold">KixVault</div>
            <ul className="flex gap-8 pt-2">
              <li className="text-lg font-light cursor-pointer hover:text-gray-600 transition-colors">
                New Arrivals
              </li>
              <li className="text-lg font-light cursor-pointer hover:text-gray-600 transition-colors">
                Men
              </li>
              <li className="text-lg font-light cursor-pointer hover:text-gray-600 transition-colors">
                Women
              </li>
              <li className="text-lg font-light cursor-pointer hover:text-gray-600 transition-colors flex">
                Login
              </li>
              <li className="text-lg font-light cursor-pointer hover:text-gray-600 transition-colors">
              <Menu/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar