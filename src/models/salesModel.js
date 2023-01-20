const connection = require('./connection');

const createSales = async (itemsSold) => {
  const saleQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(saleQuery);
  const items = 'sale_id, product_id, quantity';
  const query = `INSERT INTO StoreManager.sales_products (${items}) VALUES (?, ?, ?)`;
  // await connection.execute(query, [insertId, productId, quantity]);
  const newSale = itemsSold.map((sale) => {
    connection.execute(query, [insertId, sale.productId, sale.quantity]);
    return { productId: sale.productId, quantity: sale.quantity };
  });
  const newSaleResolvePromise = await Promise.all(newSale);
  const itemMIsterioso = { id: insertId, itemsSold: newSaleResolvePromise };
  return itemMIsterioso;
};

module.exports = {
  createSales,
};