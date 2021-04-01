const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
.post('/', async (req, res, next) => {
  try {
    const newOrder = await OrderService.create(req.body);
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
});
