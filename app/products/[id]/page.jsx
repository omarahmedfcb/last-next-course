"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProductDetails() {
  async function getProduct() {
    const req = await fetch(`https://fakestoreapi.com/products/${id}`);
    const res = await req.json();
    setProduct(res);
  }
  useEffect(() => {
    getProduct();
  }, []);
  const [product, setProduct] = useState({});
  const { id } = useParams();

  return (
    <div className="w-9/10 mx-auto flex items-center justify-between py-8">
      <div>
        <img src={product.image} alt="" />
      </div>
      <div className="content flex flex-col items-start w-1/2 gap-8">
        <h2 className="text-5xl font-bold">{product.title}</h2>
        <p className="text-2xl">{product.description}</p>
        <div className="text-5xl font-bold">
          <span>$</span>
          {product.price}
        </div>
        <button
          href={`/products/${product.id}`}
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
