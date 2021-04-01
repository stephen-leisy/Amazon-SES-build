const sendAnEmail = require('../utils/SES');
const Order = require('../models/Order');

module.exports = class OrderService {
  static async create({ name, email, quantity }) {
    // await sendAnEmail(
    //   email,
    //   `welcome ${name}, we received your order for ${quantity} units.`
    // );
    const order = await Order.insert({ name, email, quantity });
    return order;
  }
};
