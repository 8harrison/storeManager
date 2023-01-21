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

const concatenaArrays = (productSales, sales) => {
  // const categoriasFiltradas = productSales.filter(
  //   (productSale) =>
  //     sales.filter((sale) => sale.id === productSale.sale_id).length,
  // );
  const newArray = [];
  productSales.forEach((productSale) => {
    sales.forEach((sale) => {
      if (sale.id === productSale.sale_id) {
        const newObj = {
          saleId: sale.id,
          date: sale.date,
          productId: productSale.product_id,
          quantity: productSale.quantity,
        };
        newArray.push(newObj);
      }
    });
  });
  return newArray;
};
const concatenaDiferente = (productSales, sales) => {
  const newArray = [];
  productSales.forEach((productSale) => {
    sales.forEach((sale) => {
      if (sale.id === productSale.sale_id) {
        const newObj = {
          date: sale.date,
          productId: productSale.product_id,
          quantity: productSale.quantity,
        };
        newArray.push(newObj);
      }
    });
  });
  return newArray;
};
const getAllSales = async () => {
  const querySales = 'SELECT * FROM StoreManager.sales';
  const queryProductSales = 'SELECT * FROM StoreManager.sales_products';
  const [sales] = await connection.execute(querySales);
  const [productSales] = await connection.execute(queryProductSales);
  return concatenaArrays(productSales, sales);
};

const getSale = async (saleId) => {
  const querySale = `SELECT * FROM StoreManager.sales WHERE id = ${saleId}`; 
  const queryProductSales = `SELECT * FROM StoreManager.sales_products WHERE sale_id = ${saleId}`;
  const [sale] = await connection.execute(querySale);
  const [productSales] = await connection.execute(queryProductSales);
  console.log(concatenaDiferente(productSales, sale));
  return concatenaDiferente(productSales, sale);
};

module.exports = {
  createSales,
  getAllSales,
  getSale,
};