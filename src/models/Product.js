class Product {
  constructor(id, name, type, price, quantity) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
    this.quantity = quantity;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static validateType(type) {
    return ['food', 'drink', 'snack'].includes(type);
  }

  static validate(productData) {
    const errors = [];

    if (!productData.name?.trim()) {
      errors.push('Name is required');
    }

    if (!this.validateType(productData.type)) {
      errors.push('Type must be food, drink, or snack');
    }

    if (typeof productData.price !== 'number' || productData.price < 0) {
      errors.push('Price must be a non-negative number');
    }

    if (!Number.isInteger(productData.quantity) || productData.quantity < 0) {
      errors.push('Quantity must be a non-negative integer');
    }

    return errors;
  }
}

module.exports = Product;