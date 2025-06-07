import {Coffee, FileBarChartIcon, Layers, LayoutDashboard, ShoppingCart} from 'lucide-react'
import { Link } from 'react-router'

function AdminSidebar() {
  const items = [
    {name:"Dashboard",logo:<LayoutDashboard/>,to:"/admin/"},
    {name:"Products List",logo:<Coffee/>,to:"/admin/products"},
    {name:"Add Products",logo:<ShoppingCart/>,to:"/admin/add-product"},
  ]
  return (
    <div className='w-64 h-screen bg-white border-r'>
      <ul className='space-y-2 py-4'>
       {items.map((item,index)=>( 
        <li key={index}>
          <Link to={item.to}
          className='flex items-center gap-3 px-4 py-2 hover:bg-green-200'
          >
          <span className='text-gray-600 '>{item.logo}</span>
          <span className='text-gray-600 '>{item.name}</span>
          </Link>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminSidebar
