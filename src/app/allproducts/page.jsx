"use client";

import { useEffect, useState } from "react";
import Products from "../Components/NewArrival/Products";
import { fetchAllProducts } from "../lib/firebase"; // Fetch all products
import { ClipLoader } from "react-spinners"; // Import a spinner from react-spinners
import Loader from "../Components/loader/loader";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All"); // Filter by tags
  const [sortOrder, setSortOrder] = useState("none"); // Sorting by price
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts();
        console.log("Fetched products:", fetchedProducts); // Log product data
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Set the initial filtered products to all products
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    getProducts();
  }, []);

  // Handle filtering by tags
  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setSelectedTag(selectedTag);

    // Filter products based on the selected tag
    const filtered = products.filter((product) => {
      if (selectedTag === "All") return true; // No filter, show all products
      return product.tags && product.tags.includes(selectedTag); // Filter based on tags array
    });

    // Apply sorting after filtering
    setFilteredProducts(sortProducts(filtered, sortOrder));
  };

  // Handle sorting by price
  const handleSortChange = (e) => {
    const selectedSortOrder = e.target.value;
    setSortOrder(selectedSortOrder);

    // Sort the already filtered products
    setFilteredProducts(sortProducts(filteredProducts, selectedSortOrder));
  };

  // Sort products based on price
  const sortProducts = (productsToSort, sortOrder) => {
    return [...productsToSort].sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0; // No sorting
    });
  };

  // Loader display
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex border-primary border-t border-b w-full items-center justify-center pb-[48px] pt-[24px] md:pt-[48px]">
      <div className="flex  flex-col items-center justify-center gap-[24px] sm:max-w-[100%] md:max-w-screen-xl md:gap-[48px]">
        <h2 className="w-full text-secondary text-center font-lora text-[clamp(28px,20px_+_2vw,40px)] font-medium text-veryDarkPurple ">
          All Products
        </h2>

        {/* Filter Controls */}
        <div className="w-full pl-12 md:pl-0 flex   justify-between items-center gap-4 mb-4">
          {/* Tag Filter */}
          <div>
            <label htmlFor="tags" className="md:mr-2">
              Category:
            </label>
            <select
              id="tags"
              value={selectedTag}
              onChange={handleTagChange}
              className="p-2 border rounded hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-gray-300"
            >
              <option value="All">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Sort by Price */}
          <div>
            <label htmlFor="sortOrder" className="md:mr-2">
              Sort by Price:
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortChange}
              className="p-2 border rounded hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-gray-300"
            >
              <option value="none">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Display Products */}
        <Products allProducts={filteredProducts} />
      </div>
    </section>
  );
}
