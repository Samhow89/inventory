const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  // database configuration
});

const Product = sequelize.define('Product', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.FLOAT
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    await Product.create({ name, description, category, price });
    res.sendStatus(201);
  } catch (error) {
    console.error('Error creating product:', error);
    res.sendStatus(500);
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.sendStatus(500);
  }
});

// Remove a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Product.destroy({ where: { id } });
    if (affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error removing product:', error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
