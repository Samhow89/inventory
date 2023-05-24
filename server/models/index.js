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

async function createProduct(name, description, category, price) {
  try {
    const newProduct = await Product.create({
      name,
      description,
      category,
      price
    });
    console.log('Product created:', newProduct.toJSON());
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

async function getProducts() {
  try {
    const products = await Product.findAll();
    console.log('Product inventory:', products.map(product => product.toJSON()));
  } catch (error) {
    console.error('Error retrieving products:', error);
  }
}

async function removeProduct(id) {
  try {
    const affectedRows = await Product.destroy({
      where: { id }
    });
    if (affectedRows > 0) {
      console.log('Product removed successfully.');
    } else {
      console.log('Product not found.');
    }
  } catch (error) {
    console.error('Error removing product:', error);
  }
}

// Event listener for adding a product
addButton.addEventListener('click', (event) => {
  event.preventDefault();

  const name = inputName.value;
  const description = inputDescription.value;
  const category = inputCategory.value;
  const price = parseFloat(inputPrice.value);

  createProduct(name, description, category, price);

  inputName.value = '';
  inputDescription.value = '';
  inputCategory.value = '';
  inputPrice.value = '';
});

// Event listener for removing a product
list.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeButton')) {
    const container = event.target.parentElement;
    const productId = container.dataset.productId;

    removeProduct(productId);
  }
});

// Fetch initial product inventory on page load
getProducts();
