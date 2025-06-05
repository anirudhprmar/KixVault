/* eslint-disable no-unused-vars */
import { useParams } from "react-router"
import { useAdminStore } from "../../store/useAdminStore"
import { useEffect, useState } from "react"
import {LoaderCircle, Pencil, X,UploadCloudIcon} from 'lucide-react'
import toast from "react-hot-toast"
import { useForm,useFieldArray } from "react-hook-form"



function AdminEditProduct() {
 
    const { productId } = useParams()
    const {specificProduct,yourProduct,updateSpecificProduct} = useAdminStore()

      const {register, handleSubmit, control,setValue,reset} = useForm({
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
            
      const [selectedImg,setSelectedImg] = useState(null)
        
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
    

      const handleEditProduct = ()=>{
        setIsEdit(true)
      }
      const [isEdit,setIsEdit] = useState(false)
      
      const [productLoading,setProductLoading] =useState(true)
    
    
    
      const onSubmit = async(data) => {
    try {
      // Only include fields that have been changed and are not empty

      const cleanedData = Object.keys(data).reduce((acc, key) => {
        // Handle image separately
        if (key === 'imageUrl') {
          if (selectedImg) {
            acc[key] = selectedImg;
          }
          return acc;
        }
        
        // Handle arrays (sizes and category)
        if (Array.isArray(data[key])) {
          const filteredArray = data[key].filter(item => item !== undefined && item !== '');
          if (filteredArray.length > 0) {
            acc[key] = filteredArray;
          }
        }
        // Handle price and stock (numbers)
        else if (key === 'price' || key === 'stock') {
          if (data[key]) {
            acc[key] = Number(data[key]);
          }
        }
        // Handle other fields (strings)
        else if (data[key] && data[key].trim() !== '') {
          acc[key] = data[key];
        }
        return acc;
      }, {});

        //The result is an object that:

        // Only contains modified fields
        // Has proper data types
        // Excludes empty values
        // Is ready for the API call

      // Only proceed if there are actual changes
      if (Object.keys(cleanedData).length === 0) {
        toast.error('No changes detected');
        return;
      }

      const res = await updateSpecificProduct(productId, cleanedData);
      
      if (res) {
        toast.success('Product updated successfully');
        setIsEdit(false);
        setSelectedImg(null); // Reset selected image
        reset()
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update product');
    }
};
    
  useEffect(() => {
        // Debug log to check productId
        console.log('Product ID from params:', productId)
        
        async function fetchProduct() {
          if (!productId) {
            console.error('No product ID found')
            return
          }
          
          try {
            await specificProduct(productId)
          } catch (error) {
            console.error('Error fetching product:', error)
          } finally {
            setProductLoading(false)
          }
        }
        
        fetchProduct()
      }, [productId, specificProduct,updateSpecificProduct])

      
      if (productLoading) {
        (<div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>)
      }
      const product = yourProduct.product
      
      
      return (
    <div>

  {  product && <div className="flex gap-10 ">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-50 object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-xl text-gray-600">{product.brand}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>

          <div className="space-y-4">
            <p className="font-semibold">Sizes:</p>
            <div className="flex gap-2">
              {product.sizes?.map((size, index) => (
                <div key={index} className="px-4 py-2 border rounded-lg hover:bg-black hover:text-gray-50 cursor-pointer">
                  {size}
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg">In stock: {product.stock}</p>

          <div className="space-y-4">
            <p className="font-semibold">Categories:</p>
            <div className="flex gap-2">
              {product.category?.map((cat, index) => (
                <div key={index} className="px-4 py-2 bg-gray-100 rounded-lg">
                  {cat}
                </div>
              ))}
            </div>
          </div>
      
        <div className="flex gap-3 pt-5">
          <span >Want to update product ?</span>
            <button 
            onClick={handleEditProduct}
            className="cursor-pointer"
            >
              <Pencil/>
            </button>
        </div>

      </div>
    </div> }

    {isEdit && <form  onSubmit={handleSubmit(onSubmit)}
     className=" h-fit mt-10  gap-5 bg-gray-900 text-gray-50 rounded-2xl p-5"
     >
      <div
      onClick={()=>setIsEdit(!isEdit)}
      className="cursor-pointer"
      ><X/></div>
      <div className="flex justify-center items-center">
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
                    Add Category
                </button>
                </div>
        </div>
        <div className="p-2 rounded-xl ">
          
          <div className="flex flex-col pb-20">
            <div className="flex min-w-full items-center justify-around ">
                
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
          </div>
          <button type="submit"
          className="bg-red-950 text-green-100 p-2 rounded-sm w-full text-xl cursor-pointer "
          >
          Update product</button>
        </div>

      </div>

     </form>}

    </div>
  )
}

export default AdminEditProduct
