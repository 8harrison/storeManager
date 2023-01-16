const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getProduct = async (productId) => {
  const query = `SELECT * FROM StoreManager.products WHERE id = ${productId}`;

  const [[product]] = await connection.execute(query);
  return product;
};

const createProduct = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [newProduct] = await connection.execute(query, [name]);
  return newProduct.insertId;
};

module.exports = {
  getAll,
  getProduct,
  createProduct,
};