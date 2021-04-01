const { sendingEmail } = require('../utils/SES');
const Order = require('../models/Order');
const orders = require('../controllers/orders');
// require('dotenv').config();
// const AWS = require('aws-sdk');

module.exports = class OrderService {
  static async create({ name, email, itemId, quantity }) {
    await sendingEmail(name, email, quantity);

    const order = await Order.insert({ name, email, itemId, quantity });
    return order;
  }

  static async getAllOrders() {
    const orders = await Order.getOrders();
    return orders;
  }

  static async getAnOrder(id) {
    const anOrder = await Order.getOrder(id);
    return anOrder;
  }

  static async changeAnOrder( id, quantity ) {
    const chaChanges = await Order.changeOneOrder(id, quantity);
    return chaChanges;
  }

  static async deleteAnOrder(id) {
    const delDel = await Order.deleteOrder(id);
    return delDel;
  }
};
