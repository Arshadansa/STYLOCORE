import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProducts } from "../../lib/firebase";
const ProductionList = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {x
      const products = await fetchAllProducts();
      const foundProduct = products.find(item => item.id === productId);
      setProduct(foundProduct);
    };

    fetchProduct();
  }, [productId]);

  if (!product) return null; // Render nothing if the product is not found

  return (
  x
  );
};

export default ProductionList;
