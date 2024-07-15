import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('There was an error fetching the customers!', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/customers/${id}`)
      .then(() => setCustomers(customers.filter(customer => customer.id !== id)))
      .catch(error => console.error('There was an error deleting the customer!', error));
  };

  return (
    <div>
      <h1>Customer List</h1>
      <Link to="/customers/new">Add New Customer</Link>
      {customers.map(customer => (
        <div key={customer.id}>
          <h2>{customer.name}</h2>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
          <button onClick={() => handleDelete(customer.id)}>Delete</button>
          <Link to={`/customers/${customer.id}/edit`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
