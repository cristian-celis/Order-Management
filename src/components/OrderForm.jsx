import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config';

const OrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/customers`)
      .then((res) => res.json())
      .then((data) => setCustomers(data));
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer || selectedProducts.length === 0) {
      alert('Selecciona un cliente y al menos un producto.');
      return;
    }

    const order = {
      customerId: selectedCustomer,
      productIds: selectedProducts,
    };

    fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then(() => alert('¡Orden creada exitosamente!'));
  };

  const handleProductSelection = (e, productId) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg px-6 py-8 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Crear Orden</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">Cliente:</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona un cliente
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <label className="block font-medium mb-2">Productos:</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value={product.id}
                  onChange={(e) => handleProductSelection(e, product.id)}
                  className="mr-3"
                />
                {product.name}
              </label>
              <span className="text-blue-600 font-semibold">$ {product.price}</span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          Crear Orden
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
