const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 5000;  // Change the port to 5000

const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Database connection
const sequelize = new Sequelize('crm', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define a simple model for customers
const Customer = sequelize.define('Customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sync the database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the CRM API');
});

// Get all customers
app.get('/customers', async (req, res) => {
  const customers = await Customer.findAll();
  res.json(customers);
});

// Get a single customer
app.get('/customers/:id', async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  res.json(customer);
});

// Create a new customer
app.post('/customers', async (req, res) => {
  const newCustomer = await Customer.create(req.body);
  res.json(newCustomer);
});

// Update a customer
app.put('/customers/:id', async (req, res) => {
  const updatedCustomer = await Customer.update(req.body, {
    where: { id: req.params.id }
  });
  res.json(updatedCustomer);
});

// Delete a customer
app.delete('/customers/:id', async (req, res) => {
  await Customer.destroy({
    where: { id: req.params.id }
  });
  res.send('Customer deleted');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
