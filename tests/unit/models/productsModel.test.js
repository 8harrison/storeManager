const { expect } = require('chai');
const sinon = require('sinon')
const  productModels  = require('../../../src/models/productsModel')

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/productsModel.mock')

describe('Testes da unidade model de produtos', function () {
  it('Recuperandoa a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    //Act
    const result = await productModels.getAll();
    //Assert
    expect(result).to.be.equal(products);
  })
  afterEach(function () {
    sinon.restore();
})
})