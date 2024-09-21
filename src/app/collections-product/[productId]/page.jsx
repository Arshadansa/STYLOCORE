//  "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { fetchProductById, fetchRecentProducts } from "../../lib/firebase"; // Import the new Firebase function
// import { useCart } from "../../context/cartContext";
// import Image from "next/image";
// import { FaIndianRupeeSign } from "react-icons/fa6";
// import Loader from "../../Components/loader/Loader";
// import NoProduct from "@/app/Components/loader/NoProduct";

// export default function SingleProduct() {
//   const router = useRouter();
//   const { addToCart, cart } = useCart();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [imageLoading, setImageLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [price, setPrice] = useState(null);
//   const [isAdded, setIsAdded] = useState(false);
//   const [recentProducts, setRecentProducts] = useState([]);
//   const [activeTab, setActiveTab] = useState(null); // New state for active tab

//   const params = useParams();
//   const { productId } = params;

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         if (productId) {
//           const fetchedProduct = await fetchProductById(productId);

//           if (fetchedProduct) {
//             setProduct(fetchedProduct);
//             if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
//               setSelectedColor(fetchedProduct.colors[0]);
//               if (Object.keys(fetchedProduct.colors[0].sizes_inventory).length > 0) {
//                 const firstSize = Object.keys(fetchedProduct.colors[0].sizes_inventory)[0];
//                 setSelectedSize(firstSize);
//                 setPrice(fetchedProduct.colors[0].sizes_inventory[firstSize].price);
//               }
//             }
//             // Fetch recent products based on the tabs
//             if (fetchedProduct.tabs) {
//               const fetchedRecentProducts = await fetchRecentProducts(fetchedProduct.tabs);
//               setRecentProducts(fetchedRecentProducts);
//               setActiveTab(fetchedProduct.tabs[0]); // Set the first tab as active
//             }
//           } else {
//             setError("Product not found");
//           }
//         }
//       } catch (error) {
//         setError("Error fetching product: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProduct();
//   }, [productId]);

//   // Check if the product is already added to the cart
//   useEffect(() => {
//     const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
//     if (cartProducts.includes(productId)) {
//       setIsAdded(true);
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (selectedColor && selectedSize) {
//       setPrice(selectedColor.sizes_inventory[selectedSize]?.price || 0);
//     }
//   }, [selectedColor, selectedSize]);

//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const handleDecrease = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handleAddToCart = () => {
//     if (product && selectedColor && selectedSize) {
//       const selectedProduct = {
//         ...product,
//         quantity,
//         color: selectedColor.color_name,
//         size: selectedSize,
//         price: price,
//       };

//       addToCart(selectedProduct);

//       const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
//       if (
//         !cartProducts.find(
//           (item) =>
//             item.id === productId &&
//             item.color === selectedColor.color_name &&
//             item.size === selectedSize &&
//             item.price === price
//         )
//       ) {
//         cartProducts.push(selectedProduct);
//         localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
//       }
//       setIsAdded(true);
//     }
//   };

//   const handleCheckout = () => {
//     router.push(`/cart`);
//   };

//   const handleImageLoadComplete = () => {
//     setImageLoading(false);
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <NoProduct />;
//   }

//   if (!product) {
//     return <NoProduct />;
//   }

//   // Check if the cart is empty
//   const isCartEmpty = cart.length === 0;
//   return (
//     <section className="max-w-screen-xl my-20 mx-auto p-6">
//       <div className="w-full border rounded-sm overflow-hidden p-6 bg-white">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-1/2">
//             {/* Image Gallery */}
//             <div className="relative w-full ">
//               {imageLoading && <Loader />}{" "}
//               {/* Show loader until images are loaded */}
//               {selectedColor?.images.map((img, index) => (
//                 <Image
//                   key={index}
//                   width={700}
//                   height={800}
//                   src={img || "/path/to/default-image.jpg"} // Fallback to default image if none provided
//                   alt={`Product Image ${index + 1}`}
//                   className="object-contain rounded-lg w-full h-full"
//                   onLoadingComplete={handleImageLoadComplete} // Handle image load complete
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="md:w-1/2 ">
//             <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
//             <p className="text-lg text-gray-700 mb-4">{product.description}</p>
//             {selectedColor && (
//               <p className="text-lg flex items-center font-semibold mb-4">
//                 Price:&nbsp;
//                 <FaIndianRupeeSign className="text-sm" />
//                 {price ? parseFloat(price).toFixed(2) : "N/A"}
//               </p>
//             )}
//             {/* Color Options */}
//             {product.colors && (
//               <div className="mb-4">
//                 <h3 className="text-xl font-semibold mb-2">Colors:</h3>
//                 <div className="flex gap-2">
//                   {product.colors.map((color, index) => (
//                     <div
//                       key={index}
//                       className={`flex p-1 items-center space-x-2 cursor-pointer ${
//                         selectedColor === color ? "" : ""
//                       }`}
//                       onClick={() => {
//                         setSelectedColor(color);
//                         if (Object.keys(color.sizes_inventory).length > 0) {
//                           setSelectedSize(
//                             Object.keys(color.sizes_inventory)[0]
//                           );
//                         }
//                       }}
//                     >
//                       <span
//                         className="w-8 h-8 border p-3 rounded-full"
//                         style={{ backgroundColor: color.hex_code }}
//                         title={color.color_name}
//                       />
//                       <p className="text-lg" style={{ color: color.hex_code }}>
//                         {color.color_name}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {product.dimensions && (
//               <div className="mb-4">
//                 <h3 className="text-xl font-semibold mb-2">Dimensions:</h3>
//                 <table className="w-full border-collapse border border-gray-200">
//                   <tbody>
//                     <tr>
//                       <td className="border border-gray-300 p-1 font-semibold">
//                         Length:
//                       </td>
//                       <td className="border border-gray-300 p-1">
//                         {product.dimensions.length} cm
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 p-1 font-semibold">
//                         Width:
//                       </td>
//                       <td className="border border-gray-300 p-1">
//                         {product.dimensions.width} cm
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="border border-gray-300 p-1 font-semibold">
//                         Height:
//                       </td>
//                       <td className="border border-gray-300 p-1">
//                         {product.dimensions.height} cm
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             )}
//             {selectedColor?.sizes_inventory && (
//               <div className="mb-4">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Sizes and Inventory:
//                 </h3>
//                 <table className="w-full border-collapse border border-gray-200">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="border border-gray-300 p-1">Size</th>
//                       <th className="border border-gray-300 p-1">Price</th>
//                       <th className="border border-gray-300 p-1">In Stock</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(selectedColor.sizes_inventory).map(
//                       ([size, { inventory, price }]) => (
//                         <tr
//                           key={size}
//                           className={`cursor-pointer text-center ${
//                             selectedSize === size
//                               ? "bg-gray-200" // Change background color for selected size
//                               : ""
//                           }`}
//                           onClick={() => setSelectedSize(size)}
//                         >
//                           <td className="border border-gray-300 p-1">{size}</td>
//                           <td className="border flex items-center border-gray-300 p-1">
//                             <FaIndianRupeeSign className="text-sm" />
//                             {parseFloat(price).toFixed(2)}
//                           </td>
//                           <td className="border border-gray-300 p-1">
//                             {inventory}
//                           </td>
//                         </tr>
//                       )
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Quantity Selector */}
//             <div className="flex items-center mb-4">
//               <button
//                 onClick={handleDecrease}
//                 className="border px-4 py-2 bg- text-black rounded-l-lg"
//               >
//                 -
//               </button>
//               <span className="border-t border-b px-4 py-2 text-black">
//                 {quantity}
//               </span>
//               <button
//                 onClick={handleIncrease}
//                 className="border px-4 py-2 text-black rounded-r-lg"
//               >
//                 +
//               </button>
//             </div>

//             {/* Add to Cart and Checkout Buttons */}
//             <div className="flex gap-2">
//               <button
//                 className="bg-[#5b5c70] w-fit font-bold hover:bg-primary mt-4 text-white p-3 md:px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
//                 onClick={handleAddToCart}
//               >
//                 {isCartEmpty
//                   ? "Add to Cart"
//                   : isAdded
//                   ? "Added"
//                   : "Add to Cart"}
//               </button>
//               <button
//                 className="bg-[#5b5c70] w-fit font-bold hover:bg-primary mt-4 text-white p-3 md:px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
//                 onClick={handleCheckout}
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="mt-10">
//           <h3 className="text-2xl font-bold mb-4">Recent Products</h3>
//           <div className="flex space-x-4 mb-4">
//             {product.tags.map((tab, index) => (
//               <button
//                 key={index}
//                 className={`p-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   // Optionally fetch or filter products based on the active tab here
//                 }}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {recentProducts
//               .filter(product => product.tab === activeTab) // Filter based on active tab
//               .map((recentProduct) => (
//                 <div key={recentProduct.id} className="border rounded-lg p-4">
//                   <Image src={recentProduct.image} alt={recentProduct.name} width={300} height={300} className="object-cover mb-2" />
//                   <h4 className="font-semibold">{recentProduct.name}</h4>
//                   <p className="text-gray-600">
//                     <FaIndianRupeeSign className="inline" />
//                     {recentProduct.price.toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </section>

//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById, fetchRecentProducts } from "../../lib/firebase"; // Ensure this imports correctly
import { useCart } from "../../context/cartContext";
import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Loader from "../../Components/loader/Loader";
import NoProduct from "@/app/Components/loader/NoProduct";

export default function SingleProduct() {
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const router = useRouter();

  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (productId) {
          const fetchedProduct = await fetchProductById(productId);
          if (fetchedProduct) {
            setProduct(fetchedProduct);

            // Set selected color and size based on fetched product
            if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
              setSelectedColor(fetchedProduct.colors[0]);
              const firstSize = Object.keys(
                fetchedProduct.colors[0].sizes_inventory
              )[0];
              setSelectedSize(firstSize);
              setPrice(
                fetchedProduct.colors[0].sizes_inventory[firstSize].price
              );
            }

            // Fetch recent products based on the tags of the fetched product
            const fetchedRecentProducts = await fetchRecentProducts(
              fetchedProduct.tags
            );
            // Exclude the current product from recent products
            const filteredRecentProducts = fetchedRecentProducts.filter(
              (prod) => prod.id !== fetchedProduct.id
            );

            setRecentProducts(filteredRecentProducts);
            console.log(
              "Fetched Recent Products After Filtering:",
              filteredRecentProducts
            );
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
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    if (cartProducts.includes(productId)) {
      setIsAdded(true);
    }
  }, [productId]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      setPrice(selectedColor.sizes_inventory[selectedSize]?.price || 0);
    }
  }, [selectedColor, selectedSize]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize) {
      const selectedProduct = {
        ...product,
        quantity,
        color: selectedColor.color_name,
        size: selectedSize,
        price,
      };
      addToCart(selectedProduct);
      const cartProducts =
        JSON.parse(localStorage.getItem("cartProducts")) || [];
      if (
        !cartProducts.find(
          (item) =>
            item.id === productId &&
            item.color === selectedColor.color_name &&
            item.size === selectedSize &&
            item.price === price
        )
      ) {
        cartProducts.push(selectedProduct);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      }
      setIsAdded(true);
    }
  };

  const handleCheckout = () => router.push(`/cart`);

  const handleImageLoadComplete = () => setImageLoading(false);

  const handleNavigation = (productId) => {
    router.push(`/collections-product/${productId}`);
  };

  if (loading) return <Loader />;
  // if (error || !product) return <NoProduct />;

  const isCartEmpty = cart.length === 0;

  return (
    <section className="border-primary border-t border-b ">
      <section className="max-w-screen-xl  my-20 mx-auto p-6">
        <div className="w-full border rounded-sm overflow-hidden p-6 bg-white">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="relative w-full">
                {imageLoading && <Loader />}
                {selectedColor?.images.map((img, index) => (
                  <Image
                    key={index}
                    width={700}
                    height={800}
                    src={img || "/path/to/default-image.jpg"}
                    alt={`Product Image ${index + 1}`}
                    className="object-contain rounded-lg w-full h-full"
                    onLoadingComplete={handleImageLoadComplete}
                  />
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-lg text-gray-700 mb-4">
                {product.description}
              </p>
              {selectedColor && (
                <p className="text-lg flex items-center font-semibold mb-4">
                  Price:&nbsp;
                  <FaIndianRupeeSign className="text-sm" />
                  {price ? parseFloat(price).toFixed(2) : "N/A"}
                </p>
              )}
              {product.colors && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Colors:</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`flex p-1 items-center space-x-2 cursor-pointer ${
                          selectedColor === color ? "" : ""
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
                        <p
                          className="text-lg"
                          style={{ color: color.hex_code }}
                        >
                          {color.color_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                              selectedSize === size ? "bg-gray-200" : ""
                            }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            <td className="border border-gray-300 p-1">
                              {size}
                            </td>
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
              <div className="flex gap-2">
                <button
                  className="bg-[#5b5c70] w-fit font-bold hover:bg-primary mt-4 text-white p-3 md:px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
                  onClick={handleAddToCart}
                >
                  {isCartEmpty
                    ? "Add to Cart"
                    : isAdded
                    ? "Added"
                    : "Add to Cart"}
                </button>
                <button
                  className="bg-[#5b5c70] w-fit font-bold hover:bg-primary mt-4 text-white p-3 md:px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
                  onClick={handleCheckout}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Recent Products</h3>
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex space-x-4">
              {recentProducts.length === 0 ? (
                <p className="text-center text-gray-500">
                  No recent products available.
                </p>
              ) : (
                recentProducts.map((recentProduct) => (
                  <div
                    key={recentProduct.id}
                    className="border rounded-lg p-4 inline-block"
                  >
                    {/* Check if colors array exists and render the first image */}
                    {recentProduct.colors &&
                      recentProduct.colors.length > 0 &&
                      recentProduct.colors[0].images &&
                      recentProduct.colors[0].images.length > 0 && (
                        <img
                          width={400}
                          height={300}
                          src={recentProduct.colors[0].images[0]}
                          alt={recentProduct.name}
                          className="w-full h-48 object-contain rounded-md"
                        />
                      )}

                    <h4 className="text-lg font-semibold mt-2">
                      {recentProduct?.name}
                    </h4>
                    <p className="text-gray-700">
                      <FaIndianRupeeSign className="inline" />
                      {recentProduct.colors.length > 0 &&
                        recentProduct.colors[0].sizes_inventory.L?.price}
                    </p>

                    {/* Display Available Colors */}
                    <div className="mt-2">
                      {recentProduct.colors &&
                        recentProduct.colors.length > 0 && (
                          <div>
                            <h5 className="font-medium">Available Colors:</h5>
                            <div className="flex space-x-2">
                              {recentProduct.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-6 h-6 rounded-full"
                                  style={{ backgroundColor: color.hex_code }}
                                  title={color.color_name}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Corrected the onClick handler */}
                    <button
                      onClick={() => handleNavigation(recentProduct.id)}
                      className="bg-[#5b5c70] w-fit font-bold hover:bg-primary mt-4 text-white p-3 md:px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
                      >
                      View Product
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
