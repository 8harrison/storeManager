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

module.exports = {
  getAll,
  getProduct,
};