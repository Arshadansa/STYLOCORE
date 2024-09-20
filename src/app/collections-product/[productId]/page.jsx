"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById } from "../../lib/firebase"; // Import Firebase function
import { useCart } from "../../context/cartContext";
import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Link from "next/link";
import Loader from "../../Components/loader/Loader"
import NoProduct from "@/app/Components/loader/NoProduct";

export default function SingleProduct() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(null);

  const params = useParams(); // Access URL parameters
  const { productId } = params; // Fetch 'productId' from URL

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (productId) {
          const fetchedProduct = await fetchProductById(productId); // Fetch from Firebase

          if (fetchedProduct) {
            setProduct(fetchedProduct);
            // Automatically select the first color and size if available
            if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
              setSelectedColor(fetchedProduct.colors[0]);
              if (
                Object.keys(fetchedProduct.colors[0].sizes_inventory).length > 0
              ) {
                const firstSize = Object.keys(
                  fetchedProduct.colors[0].sizes_inventory
                )[0];
                setSelectedSize(firstSize);
                setPrice(
                  fetchedProduct.colors[0].sizes_inventory[firstSize].price
                );
              }
            }
          } else {
            setError("Product not found");
          }
        }
      } catch (error) {
        setError("Error fetching product: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      setPrice(selectedColor.sizes_inventory[selectedSize]?.price || 0);
    }
  }, [selectedColor, selectedSize]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize) {
      const selectedProduct = {
        ...product,
        quantity,
        color: selectedColor.color_name,
        size: selectedSize,
        price: price,
      };
      addToCart(selectedProduct);
    }
  };

  const handleCheckout = () => {
    router.push(`/cart`);
  };

  if (loading) {
    return (
    <Loader/>
    );
  }

  if (error) {
    return (
     <NoProduct/>
    );
  }

  if (!product) {
    return (
      <div className="fixed inset-0 flex flex-col text-3xl text-white items-center justify-center bg-black bg-opacity-50 z-50">
        <p>No product data available.</p>
        <Link href="/allproducts">
          <button className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md mt-4">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-screen-xl my-20 mx-auto p-6">
      <div className="w-full border rounded-sm overflow-hidden p-6 bg-white">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            {/* Image Gallery */}
            <div className="relative w-full ">
              {selectedColor?.images.map((img, index) => (
                <Image
                  key={index}
                  width={700}
                  height={800}
                  src={img || "/path/to/default-image.jpg"} // Fallback to default image if none provided
                  alt={`Product Image ${index + 1}`}
                  className="object-contain rounded-lg w-full h-full"
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 ">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-lg  text-gray-700 mb-4">{product.description}</p>
            {selectedColor && (
              <p className="text-lg flex items-center font-semibold mb-4">
                Price:&nbsp;
                <FaIndianRupeeSign className="text-sm" />
                {price ? parseFloat(price).toFixed(2) : "N/A"}
              </p>
            )}
            {/* Color Options */}
            {product.colors && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Colors:</h3>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`flex p-1 items-center space-x-2 cursor-pointer ${
                        selectedColor === color
                          ? "border-2 border-gray-300"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedColor(color);
                        if (Object.keys(color.sizes_inventory).length > 0) {
                          setSelectedSize(
                            Object.keys(color.sizes_inventory)[0]
                          );
                        }
                      }}
                    >
                      <span
                        className="w-8 h-8 border p-3 rounded-full"
                        style={{ backgroundColor: color.hex_code }}
                        title={color.color_name}
                      />
                      <p className="text-lg" style={{ color: color.hex_code }}>
                        {color.color_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedColor?.sizes_inventory && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  Sizes and Inventory:
                </h3>
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-1">Size</th>
                      <th className="border border-gray-300 p-1">Price</th>
                      <th className="border border-gray-300 p-1">In Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(selectedColor.sizes_inventory).map(
                      ([size, { inventory, price }]) => (
                        <tr
                          key={size}
                          className={`cursor-pointer text-center ${
                            selectedSize === size
                              ? "bg-gray-200" // Change background color for selected size
                              : ""
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          <td className="border border-gray-300 p-1">{size}</td>
                          <td className="border flex items-center border-gray-300 p-1">
                            <FaIndianRupeeSign className="text-sm" />
                            {parseFloat(price).toFixed(2)}
                          </td>
                          <td className="border border-gray-300 p-1">
                            {inventory}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {/* Dimensions */}
            {product.dimensions && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Dimensions:</h3>
                <table className="w-full border-collapse border border-gray-200">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-1 font-semibold">
                        Length:
                      </td>
                      <td className="border border-gray-300 p-1">
                        {product.dimensions.length} cm
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 font-semibold">
                        Width:
                      </td>
                      <td className="border border-gray-300 p-1">
                        {product.dimensions.width} cm
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 font-semibold">
                        Height:
                      </td>
                      <td className="border border-gray-300 p-1">
                        {product.dimensions.height} cm
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center mb-4">
              <button
                onClick={handleDecrease}
                className="border px-4 py-2 bg- text-black rounded-l-lg"
              >
                -
              </button>
              <span className="border-t border-b px-4 py-2 text-black">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="border px-4 py-2 text-black rounded-r-lg"
              >
                +
              </button>
            </div>
            <div className="flex">
              <button
                onClick={handleAddToCart}
                className="bg-[#5b5c70] font-bold mr-3 hover:underline hover:bg-primary mt-1 text-white p-3 px-5 md:px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
              >
                Add to Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary mt-1 text-white p-3 px-5 md:px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
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
