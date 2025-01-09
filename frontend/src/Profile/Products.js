import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyClick = (product) => {
    navigate("/order", { state: { selectedProduct: product } });
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h4>{product.title}</h4>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleBuyClick(product)}>Buy</button>
        </div>
      ))}
    </div>
  );
}

export default Products;
