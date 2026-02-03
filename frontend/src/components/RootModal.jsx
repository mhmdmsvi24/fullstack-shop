import { forwardRef, useImperativeHandle, useState } from "react";
import { X, Star, Ruler, Palette, Tag, Package, ShoppingCart } from "lucide-react";

const RootModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  useImperativeHandle(ref, () => ({
    open: (data) => {
      setProduct(data);
      setIsOpen(true);
    },
    close: () => setIsOpen(false)
  }));

  if (!isOpen || !product) return null;

  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const savings = product.price - discountedPrice;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      onClick={() => setIsOpen(false)}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/50"
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative bg-cardBg rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute cursor-pointer top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-black transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Modal Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-gray-100">
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <span className="absolute bg-white top-4 left-4 text-obsidian-purple font-semibold px-3 py-1.5 text-sm rounded-md">
                Save ${savings.toFixed(2)}
              </span>
            )}
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-medium text-white uppercase tracking-wider">
                {product.brand}
              </p>
              <h2 className="text-xl font-bold text-white leading-tight">
                {product.name}
              </h2>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    color="white"
                    className={`w-5 h-5 ${i < Math.floor(product.rating)
                      ? "fill-white text-accent"
                      : i < product.rating
                        ? "text-accent"
                        : "fill-gray-300 text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-white">{product.rating}</span>
              <span className="text-sm text-white/50">(Customer Reviews)</span>
            </div>

            {/* Price Section */}
            <div className="p-4 bg-gray-100 rounded-lg space-y-1">
              <div className="flex items-baseline gap-3 justify-center">
                <span className="text-3xl font-bold text-black">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <p className="text-sm text-accent font-medium text-center">
                  You save ${savings.toFixed(2)} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-white mb-2">Description</h4>
              <p className="text-white text-sm leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <Ruler className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-xs text-gray-500">Size</p>
                  <p className="text-sm font-medium text-black">{product.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <Palette className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-xs text-gray-500">Color</p>
                  <p className="text-sm font-medium text-black">{product.color}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <Tag className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-medium text-black capitalize">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <Package className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-xs text-gray-500">In Stock</p>
                  <p className="text-sm font-medium text-accent">{product.quantity} available</p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className="w-full bg-obsidian-purple hover:bg-obsidian-purple/90 text-white cursor-pointer font-semibold gap-2 h-12 text-base rounded-lg transition-colors flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ${discountedPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RootModal;
