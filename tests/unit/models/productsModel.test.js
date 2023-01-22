const { expect } = require('chai');
const sinon = require('sinon')
const productModels = require('../../../src/models/productsModel')
const salesModel = require('../../../src/models/salesModel')

const connection = require('../../../src/models/connection');
const { products, sales } = require('./mocks/productsModel.mock')

describe('Testes da unidade model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    //Act
    const result = await productModels.getAll();
    //Assert
    expect(result).to.be.equal(products);
  })
  it('Recupera um produto', async function () {
    //Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    //Act
    const result = await productModels.getProduct(1);
    //Assert
    expect(result).to.be.equal(products[0])

  })
  // it('Cria um produto', async function () {
  //   //Arrange
  //   sinon.stub(connection, 'execute').resolves([{ name: 'novoIte2m' }])
  //   //Act
  //   const result = await productModels.createProduct({ name: 'novoI3tem' } )
  //   //Assert
  //   expect(result).to.be.equal({ name: 'novoI4tem' })
  // })
  afterEach(function () {
    sinon.restore();
})
})
describe("Testes da unidade model de sales", function () {
  it("Recuperando a lista de sales", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([[sales]]);
    //Act
    const result = await salesModel.getAllSales();
    //Assert
    // console.log(result)
    console.log(sales)
    expect(result).to.be.deep.equal(sales);
  });
  afterEach(function () {
    sinon.restore();
  });
});