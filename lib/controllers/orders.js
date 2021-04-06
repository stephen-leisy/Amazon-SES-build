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
  })
  .get('/', async (req, res, next) => {
    try {
      const allOrders = await OrderService.getAllOrders();
      res.send(allOrders);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const anOrder = await OrderService.getAnOrder(req.params.id);
      res.send(anOrder);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const changeOrder = await OrderService.changeAnOrder(
        req.params.id,
        req.body.quantity,
        req.body.name,
        req.body.email
      );
      res.send(changeOrder);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    
    try {
      const deletedOrder = await OrderService.deleteAnOrder(req.params.id);
      res.send(deletedOrder);
    } catch (err) {
      next(err);
    }
  });
