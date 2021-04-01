const pool = require('../utils/pool');

module.exports = class Order {
  id;
  name;
  email;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.quantity = row.quantity;
  }

  static async insert({ name, email, quantity }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO orders (name, email, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, email, quantity]
    );
    return new Order(rows[0]);
  }
};
