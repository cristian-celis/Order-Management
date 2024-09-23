import React from 'react';
import OrderList from './components/OrderList';
import CustomerList from './components/CustomerList';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Gestión de Ordenes</h1>
      <OrderForm />
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <OrderList />
        </div>
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <CustomerList />
        </div>
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default App;