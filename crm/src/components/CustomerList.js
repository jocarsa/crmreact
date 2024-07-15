import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('There was an error fetching the customers!', error));
  }, []);

  return (
    <div>
      <h1>Customer List</h1>
      {customers.map(customer => (
        <div key={customer.id}>
          <h2>{customer.name}</h2>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
