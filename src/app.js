const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
// const validateSales = require('./middlewares/validateSales');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getProduct);
app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSale);

app.use(express.json());

app.post('/products', productsController.createProduct);
app.post('/sales', salesController.createSales);

app.put('/products/:id', productsController.updateProduct);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;