import { useForm, useFieldArray} from "react-hook-form"
import toast from "react-hot-toast";
import { useAdminStore } from "../../store/useAdminStore";
import {UploadCloudIcon} from 'lucide-react'
import { useState } from "react";


function AdminAddProduct() {

  const {addProduct}=useAdminStore()

    const {register, handleSubmit, control,setValue} = useForm({
      defaultValues:{
        sizes:[],
        category:[] 
      }
    })

    const { fields:sizesFields, append:appendSize, remove:removeSize } = useFieldArray({
       control,
       name: 'sizes', 

     });

    const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
        control,
        name: 'category',
      });
      
  const handleImageUpload =async (e)=>{
    const file = e.target.files[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload =  async ()=>{
      const base64Image = reader.result;
      setSelectedImg(base64Image)
      setValue("imageUrl",base64Image)
    }
  }

  const [selectedImg,setSelectedImg] = useState(null)

  const onSubmit = (data)=>{
    console.log(data);
    
    const req = addProduct(data);
   if (req) {
    toast.success("Product added")
   }
  }

  return (
    <div>
     <form  onSubmit={handleSubmit(onSubmit)}
     className="grid grid-cols-2 h-screen gap-5"
     >
      <div className="p-2 rounded-xl ">
        {/* form details */}

          <div className='py-2 px-2'>
              <label className="flex flex-col gap-1 w-100">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="ADILETTE 22"
                  {...register("name")}
                  className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                  focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                  transition-all duration-300 hover:border-[#030303]'
                />
              </label>
            </div>

            <div className='px-2 py-2'>
              <label className="flex flex-col gap-1 w-100">
                <span>Brand</span>
                <input
                  type="text"
                  placeholder="Nike"
                  {...register("brand")}
                  className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                  focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                  transition-all duration-300 hover:border-[#030303]'
                />
              </label>
            </div>

            <div className='px-2 py-2'>
              <label className="flex flex-col gap-1 w-100" >
                <span>Price</span>
                <input
                  name="price"
                  type="text"
                  placeholder="$99.00"
                  {...register("price", { valueAsNumber: true })}
                  className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                  focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                  transition-all duration-300 hover:border-[#030303]'
                />
              </label>
            </div>

            <div className='px-2 py-2'>
              <label className="flex flex-col gap-1 w-100">
                <span>Description</span>
                <input
                  name="description"
                  type="text"
                  placeholder="LIGHT BROWN"
                  {...register("description")}
                  className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                  focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                  transition-all duration-300 hover:border-[#030303]'
                />
              </label>
            </div>


              <div className="px-2 py-2 flex gap-4">
              <label className="">
                <span>Sizes</span> 
                {sizesFields.map((field,index)=>(
                      <div  key={field.id} className="flex gap-1 w-100 pb-3">
                    <input
                      {...register(`sizes.${index}`, { valueAsNumber: true })}
                      defaultValue={field.value}
                      className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                      focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                      transition-all duration-300 hover:border-[#030303]'
                      /> 
                    <button type="button" onClick={() => removeSize(index)} className="bg-red-500 rounded-md text-red-100 p-1">
                      Remove
                    </button>
                  </div>
                  ))}
              </label> 

              <button type="button" onClick={() => appendSize()} className="bg-green-600 text-green-100 p-1 rounded-md  h-fit">
                  Add Sizes
              </button>
              </div>

            <div className='px-2 py-2'>
              <label className="flex flex-col gap-1 w-100">
                <span>Stock</span> 
              <input
                type="number"
                placeholder="30 items in stock"
                {...register("stock", { valueAsNumber: true })}
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                transition-all duration-300 hover:border-[#030303]'
                />
              </label> 
            </div>

              <div className="px-2 py-2 flex gap-4">
              <label>
                <span>Category</span> 
                {categoryFields.map((field,index)=>(
                      <div  key={field.id} className="flex gap-1 w-100 pb-3">
                    <input
                      {...register(`category.${index}`)}
                      defaultValue={field.value}
                      className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                      focus:outline-none focus:ring-2 focus:ring-[#030303] focus:border-transparent 
                      transition-all duration-300 hover:border-[#030303]'
                      /> 
                    <button type="button" onClick={() => removeCategory(index)} className="bg-red-500 rounded-md text-red-100 p-1">
                      Remove
                    </button>
                  </div>
                  ))}
              </label> 

              <button type="button" onClick={() => appendCategory()} className="bg-green-600 rounded-md text-green-100 p-1 h-fit">
                  Add Sizes
              </button>
              </div>
      </div>
      <div className="p-2 rounded-xl ">
        
        <div className="flex flex-col pb-20">
          <div className="flex min-w-full items-center justify-around ">
              <div>
                  <img src="/images/sneak1.jpeg" alt="sneaker" className="w-40 h-60" />
              </div>
              <div>
                  <img src="/images/sneak2.jpeg" alt="sneaker" className="w-40 h-60" />
              </div>
              <div >
                <div>
                  <label className="cursor-pointer">
                    {selectedImg ? <div>
                      <img src={selectedImg} alt="product image" className="w-60 h-60 " />
                    </div> :<div className="text-center flex items-center justify-center flex-col  border-2 border-dashed p-2">
                  <span>
                  <UploadCloudIcon/>
                  </span> 
                  Drop your image here
                      </div>}
                  <input 
                  type="file"
                  className="hidden"
                  accept="image/*" 
                  {...register("imageUrl")}
                  onChange={(e)=>{
                    handleImageUpload(e)
                  }}
                  />
                  </label>
                </div>
              </div>
          </div>
          <p className="text-md px-5 pt-10 text-left">Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the product shows all the details</p>
        </div>

        <button type="submit"
        className="bg-green-950 text-green-100 p-2 rounded-sm w-full text-xl cursor-pointer "
        >
        Add product</button>
      </div>
     </form>
    </div>
  )
}

export default AdminAddProduct
