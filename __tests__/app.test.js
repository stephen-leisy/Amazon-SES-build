const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');
const SES = require('../lib/utils/SES');

jest.mock('../lib/utils/SES.js');

describe('Amazon SES build routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const testUser = {
    name: 'Steph Leisy',
    email: 'stleisy@gmail.com',
    itemId: 1,
    quantity: 1,
  };

  let userOrder;
  beforeEach(async () => {
    userOrder = await request(app).post('/api/v1/orders').send(testUser);
  });

  it('it takes an order quantity and puts it into the database and sends an email', async () => {

    expect(SES.sendingEmail).toHaveBeenCalledTimes(1);
    expect(userOrder.body).toEqual({
      id: '1',
      name: 'Steph Leisy',
      email: 'stleisy@gmail.com',
      itemId: 1,
      quantity: 1,
    });
  });
  it('displays all orders', async () => {
    const results = await request(app).get('/api/v1/orders');
    expect(results.body).toEqual([
      {
        id: '1',
        name: 'Steph Leisy',
        email: 'stleisy@gmail.com',
        itemId: 1,
        quantity: 1,
      },
    ]);
  });
  it('displays a single order by ID', async () => {
    const results = await request(app).get('/api/v1/orders/1');
    expect(results.body).toEqual({
      id: '1',
      name: 'Steph Leisy',
      email: 'stleisy@gmail.com',
      itemId: 1,
      quantity: 1,
    });
  });
  it('updates an order quantity by ID', async () => {
    const results = await request(app).put('/api/v1/orders/1').send({ quantity: 2 });
    expect(results.body).toEqual({ id: '1',
    name: 'Steph Leisy',
    email: 'stleisy@gmail.com',
    itemId: 1,
    quantity: 2,})
  })
  it('deletes an order by its id', async () => {
    
    await request(app).delete('/api/v1/orders/1');
    const results = await request(app).get('/api/v1/orders');
    expect(results.body).toEqual([]);
  })
});
