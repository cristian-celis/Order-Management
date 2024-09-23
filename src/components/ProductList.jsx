import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Productos</h2>
      <ul className="max-h-64 overflow-y-auto">
        {products.map((product) => (
          <li key={product.id} className="border-b py-4 flex justify-between items-center">
            <p className="font-medium">{product.name}</p>
            <span className="text-blue-500 font-semibold">$ {product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;