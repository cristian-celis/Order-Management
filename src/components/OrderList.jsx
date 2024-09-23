import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Error fetching customers:', err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Esta seguro de eliminar esta orden?')) {
      fetch(`${API_BASE_URL}/orders/${id}`, { method: 'DELETE' })
        .then(() => setOrders(orders.filter((order) => order.id !== id)));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Ordenes</h2>
      <ul className="max-h-64 overflow-y-auto">
        {orders.map((order) => (
          <li key={order.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Orden #{order.id}</p>
              <p className="text-sm text-gray-600">Cliente: {order.customer.name}</p>

              <p className="text-sm text-gray-600">Total: $ {order.total}</p>
            </div>

            <div className="gap-2 mb-3">
                {order.products.map((product) => (
                  <div key={product.id} className="px-1 py-1 flex justify-between items-center">
                    <label className="flex items-center text-sm pr-2">
                      {product.name}
                    </label>
                    <span className="text-blue-600 text-sm">${product.price}</span>
                  </div>
                ))}
              </div>

            <button
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors"
              onClick={() => handleDelete(order.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;