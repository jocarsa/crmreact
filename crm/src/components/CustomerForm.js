import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/customers/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('There was an error fetching the customer!', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/customers/${id}`, formData)
        .then(() => navigate('/customers'))
        .catch(error => console.error('There was an error updating the customer!', error));
    } else {
      axios.post('http://localhost:5000/customers', formData)
        .then(() => navigate('/customers'))
        .catch(error => console.error('There was an error creating the customer!', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Customer' : 'Add New Customer'}</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <button type="submit">{id ? 'Update Customer' : 'Add Customer'}</button>
    </form>
  );
};

export default CustomerForm;
