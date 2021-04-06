const pool = require('../utils/pool');

module.exports = class Order {
  id;
  name;
  email;
  itemId;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.name = row.users_name;
    this.email = row.email;
    this.itemId = row.item_id;
    this.quantity = row.quantity;
  }

  static async insert({ name, email, itemId, quantity }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO orders (users_name, email, item_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, itemId, quantity]
    );
    return new Order(rows[0]);
  }

  static async getOrders() {
      const {
          rows,
      } = await pool.query('SELECT * FROM orders');
      return rows.map((row) => {
          return new Order(row);
      })
  }
  static async getOrder(id) {
      const {
        rows,
      } = await pool.query('SELECT * FROM orders WHERE id = $1', [id,])
      return new Order(rows[0]);
  }
  static async changeOneOrder(id, quantity) {
    const {
      rows,
    } = await pool.query('UPDATE orders SET quantity = $1 WHERE id = $2 RETURNING *', [quantity, id])
    return new Order(rows[0]);
  }
  static async deleteOrder(id) {
    const {
      rows,
    } = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    return new Order(rows[0]);
  }
};
