import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/customers`)
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error('Error fetching customers:', err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Clientes</h2>
      <ul className="max-h-64 overflow-y-auto">
        {customers.map((customer) => (
          <li
            key={customer.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="text-sm text-gray-600">{customer.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;