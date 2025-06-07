import { useNavigate } from 'react-router'

function ProductCard({name, brand, price, imageUrl, pId}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/product/${pId}`)
  }

  return (
    <div
      onClick={handleClick}
      className="w-full cursor-pointer transition-transform hover:scale-105"
    >
      <div className="p-4">
        <div className="aspect-square overflow-hidden rounded-lg mb-4">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="space-y-2 px-2">
          <p className="text-gray-600 text-lg">{brand}</p>
          <h3 className="text-2xl font-bold truncate">{name}</h3>
          <p className="text-3xl font-bold">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard