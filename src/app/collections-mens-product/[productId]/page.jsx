"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Use useParams for dynamic params
import { products } from "@/app/Data/products"; // Assuming products data is imported
import { useCart } from "../../context/cartContext";

export default function SingleProduct() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const params = useParams(); // Use useParams for dynamic route parameters in the App Router
  const { productId } = params; // Access 'productId' from URL

  useEffect(() => {
    if (productId) {
      const fetchedProduct = products.Accessories.find(
        (item) => item.id === parseInt(productId)
      );

      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setLoading(false);
      } else {
        setError("Product not found");
        setLoading(false);
      }
    }
  }, [productId]);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  const handleCheckout = () => {
    router.push(`/cart`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="max-w-screen-xl flex min-h-screen mx-auto p-6">
      <div className="w-full border rounded-lg overflow-hidden shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl text-black font-bold mb-4">{product.name}</h2>
            <p className="text-gray-400 mb-2">Price: ¥{product.price}</p>
            <p className="text-gray-400 mb-2">Available Quantity: {product.quantity}</p>
            <div className="flex items-center mb-4">
              <button
                onClick={handleDecrease}
                className="border px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-l-lg"
              >
                -
              </button>
              <span className="border-t border-b border-gray-800 px-4 py-2 text-black">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="border px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-r-lg"
              >
                +
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="border px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={handleCheckout}
                className="border px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
