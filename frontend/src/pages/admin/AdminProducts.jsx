import { useEffect, useState } from "react"
import { useAdminStore } from "../../store/useAdminStore";
import AdminProductCard from '../../components/AdminProductCard'
import { Search, LoaderCircle } from "lucide-react";


function AdminProducts() {

const {getProducts,productsAvailable,products,bulkResults,bulkedResults}=useAdminStore()
const [page,setPage] = useState(1)
const [searchResults,setSearchResults] = useState([])
const [filter,setFilter] = useState('')

useEffect(()=>{
  getProducts(page)
},[getProducts,page])

useEffect(()=>{
  setTimeout(() => {
    bulkResults(filter)
    setSearchResults(bulkedResults)
  }, 1000);
},[filter,bulkResults,bulkedResults])


if (productsAvailable) {
  //skelton loading
 return (<div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>)
}

{/* search by brand or name */}



  return (
    <div className="px-10">

    <div className="pt-5 pb-5 relative" > 
      <input
        type="text"
        onChange={(e)=>setFilter(e.target.value)}
        placeholder="Search For Product"
        className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
        focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
        transition-all duration-300 hover:border-[#030303] w-fit '
      />
      <span className="absolute right-[78%] top-8"><Search/></span>
      
        {searchResults ? searchResults.map(p =>(
          <div key={p._id} className={!filter ? 'hidden' : 'block'}>
          <AdminProductCard 
            pId={p._id}
            name={p.name}
            brand={p.brand}
            price={p.price}
            imageUrl={p.imageUrl}
            stock={p.stock}
          />
        </div>
        )) : 'No results'}
    </div>

<div className={filter ? 'hidden' : 'block'}>
     <nav>
      <ul className="grid grid-cols-4 ">
        <li className="text-2xl font-bold">Product</li>
        <li className="text-2xl font-bold">Price</li>
        <li className="text-2xl font-bold">Stock</li>
        <li className="text-2xl font-bold">Actions</li>
      </ul>
     </nav>

     <div>
    {products && products.results.map((p)=>(
      <div key={p._id}>
        <AdminProductCard 
          pId={p._id}
          name={p.name}
          brand={p.brand}
          price={p.price}
          imageUrl={p.imageUrl}
          stock={p.stock}
        />
      </div>
    ))}
     </div>

     <div className="flex gap-5">
      <button
      onClick={()=>setPage(products.previous.page)}
      className="px-4 py-2 border rounded-lg hover:bg-black hover:text-gray-50 cursor-pointer"
      >Previous</button>
      <button
      onClick={()=>setPage(products.next.page)}
className="px-4 py-2 border rounded-lg hover:bg-black hover:text-gray-50 cursor-pointer"
      >Next</button>
     </div>
</div>

    </div>
  )
}

export default AdminProducts
