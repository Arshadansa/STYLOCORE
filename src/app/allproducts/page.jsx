"use client";

import { useEffect, useState } from "react";
import Products from "../Components/NewArrival/Products";
import { fetchAllProducts } from "../lib/firebase";
import Loader from "../Components/loader/Loader";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All Products");
  const [sortOrder, setSortOrder] = useState("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts();
        console.log("Fetched products:", fetchedProducts);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the selected tag
    const filtered = products.filter((product) => {
      if (selectedTag === "All Products") return true;
      return product.tags && Array.isArray(product.tags) && product.tags.includes(selectedTag);
    });
    

    // Sort the filtered products
    const sorted = sortProducts(filtered, sortOrder);

    // Update the filteredProducts state
    setFilteredProducts(sorted);
  }, [selectedTag, sortOrder, products]);

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortProducts = (productsToSort, order) => {
    return [...productsToSort].sort((a, b) => {
      if (order === "asc") return a.price - b.price;
      if (order === "desc") return b.price - a.price;
      return 0;
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex border-primary border-t border-b w-full items-center justify-center pb-[48px] pt-[24px] md:pt-[48px]">
      <div className="flex flex-col items-center justify-center gap-[24px] sm:max-w-[100%] md:max-w-screen-xl md:gap-[48px]">
        <h2 className="w-full text-secondary text-center font-lora text-[clamp(28px,20px_+_2vw,40px)] font-medium text-veryDarkPurple">
          {selectedTag}
        </h2>

        <div className="w-full pl-12 md:pl-0 flex justify-between items-center gap-4 mb-4">
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
              <option value="All Products">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

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

        <Products allProducts={filteredProducts} />
      </div>
    </section>
  );
}