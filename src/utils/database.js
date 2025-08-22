class Database {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  findAll() {
    return this.products;
  }

  findById(id) {
    return this.products.find(p => p.id === id);
  }

  create(productData) {
    const product = {
      id: this.nextId++,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.products.push(product);
    return product;
  }

  update(id, productData) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...productData,
      updatedAt: new Date().toISOString()
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    return this.products.splice(index, 1)[0];
  }

  reset() {
    this.products = [];
    this.nextId = 1;
  }
}

module.exports = new Database();