import { useState } from "react"
import { ShoppingCart } from "lucide-react"

function ProductCard({ product, onOpenModal }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const discountedPrice = product.price - (product.price * product.discount) / 100

  return (
    <div>
      <div className="flex flex-col rounded-xl overflow-hidden font-bold relative transition-all duration-300 group shadow-[1px_1px_10px_3px_rgba(31,41,55,0.3)] max-w-100 mx-auto md:max-w-full h-full justify-between">
        {/* Card Discount */}
        {
          product.discount > 0
          && <div className="absolute  m-3 bg-blue-50 text-red-600 rounded-xl px-2 py-1 text-sm z-10 flex items-center gap-2">
            %{product.discount} OFF
          </div>
        }

        {/* Image Container */}
        <div className="aspect-square w-full overflow-hidden relative cursor-pointer"
          onClick={onOpenModal}>
          <img src={product.image_url} className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isImageLoaded ? "opacity-100" : "opacity-0"
            }`} onLoad={() => setIsImageLoaded(true)} alt={product.name} />

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <span className="text-black/90 font-medium text-sm bg-white px-4 py-2 rounded-full">
              Quick View
            </span>
          </div>

        </div>
        {/* Info */}
        <div className="flex flex-col grow gap-2 p-4 justify-between">
          <div className="flex flex-col gap-6 grow justify-between">
            <div>
              <div className="text-black/50 uppercase">{product.brand}</div>
              <div className="text-black/90">{product.name}</div>
            </div>
            <div className="flex gap-2 items-center text-black/90">
              <div className="text-lg font-bold">${discountedPrice}</div>
              <div className="line-through text-black/50">${product.price}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex gap-2 items-center justify-center bg-obsidian-purple text-white w-full px-4 py-2 rounded-xl">
              <ShoppingCart color="white" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
