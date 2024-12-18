const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');



class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 100

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  async create(data) {
    const newProduct = {
        id: faker.string.uuid(),
        ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      if (this.products.length > 0) {
        resolve(this.products);
      } else {
        reject(new Error('No products found'));
      }
    });
  }
  
  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block')
    }
    return product;
  }

  async update(id,changes) {
    const index = this.products.findIndex(item => item.id === id)
    if (index ===-1) {
        throw boom.notFound('product not found')
    }
    const product = this.products[index];
    this.products[index]= {
      ...product,
      ...changes
    };
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if (index ===-1) {
        throw boom.notFound('product not found')
    }
    this.products.splice(index, 1);
    return {id}

  }
}

module.exports = ProductService;



