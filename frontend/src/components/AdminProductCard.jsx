import { useNavigate } from 'react-router'
import { PencilIcon, Trash2 } from "lucide-react";
import { useAdminStore } from "../store/useAdminStore";
import toast from "react-hot-toast";


function ProductCard({name, price, imageUrl, pId, stock}) {
  const navigate = useNavigate()

    const {deleteProduct} = useAdminStore()

    const handleDeleteProduct = async(productId) =>{ // add a modal 
        const deleted = await deleteProduct(productId)
        if (deleted) {
            toast.success("Product deleted successfully")
        }
    }

    const handleUpdateProduct = ()=>{
        navigate(`/admin/edit-product/${pId}`)
        
    }

  return (


    <div className="items-center mb-10 mt-10 grid grid-cols-4">

<div className='flex items-center gap-2'>
        <img 
        src={imageUrl} 
        alt={name} 
        className="w-25 object-cover rounded-md "
        />

        <p className="text-2xl font-serif truncate">{name}</p>

</div>

        <p className="text-2xl font-serif truncate">${price.toFixed(2)}</p>

        <p className="text-2xl font-serif truncate">{stock}</p>

        <div className='flex gap-5'>
            <button onClick={handleUpdateProduct} className='cursor-pointer hover:bg-green-200 hover:rounded-xl p-1 h-fit'>
                <PencilIcon/>
            </button>
            <button onClick={()=>handleDeleteProduct(pId)} className='cursor-pointer hover:bg-red-200 hover:rounded-xl p-1 h-fit'>
                <Trash2/>
            </button>
        </div>

    </div>
  )
}

export default ProductCard