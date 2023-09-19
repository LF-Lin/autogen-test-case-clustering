import ShoppingCartItem from "./ShoppingCartItem.js";

export default class ShoppingCart {
  constructor() {
    this.items = [];
  }

  validateInput(itemName, quantity, price) {
    const errors = [];

    if (typeof itemName !== "string" || itemName.length === 0) {
      errors.push("Invalid item name");
    }
    if (typeof quantity !== "number" || quantity < 0) {
      errors.push("Invalid quantity");
    }
    if (typeof price !== "number" || price < 0) {
      errors.push("Invalid price");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }
  }

  findItem(itemName) {
    if (typeof itemName !== "string" || itemName.length === 0) {
      throw new Error("Invalid item name");
    }
    return this.items.find((item) => item.productName === itemName);
  }

  addItem(itemName, quantity, price) {
    this.validateInput(itemName, quantity, price);

    const existingItem = this.findItem(itemName);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(itemName, quantity, price));
    }

    return this;
  }

  removeItem(itemName, quantity) {
    this.validateInput(itemName, quantity, 0);

    const existingItem = this.findItem(itemName);

    if (!existingItem) {
      throw new Error("Item does not exist");
    }

    if (existingItem.quantity < quantity) {
      throw new Error("Invalid quantity");
    } else if (existingItem.quantity === quantity) {
      this.items = this.items.filter((item) => item.productName !== itemName);
    } else {
      existingItem.quantity -= quantity;
    }

    return this;
  }

  applyDiscount(discount) {
    if (typeof discount !== "number" || discount < 0 || discount > 1) {
      throw new Error("Invalid discount");
    }
    this.items.forEach((item) => {
      item.price = item.price * discount;
    });

    return this;
  }

  getTotalPrice() {
    return this.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  getItem(itemName) {
    if (typeof itemName !== "string") {
      throw new Error("Invalid input");
    }
    return this.findItem(itemName);
  }

  getItems() {
    return this.items;
  }

  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    return this;
  }
}
