const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Amazon SES build routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const testUser = {
    name: 'Steph Leisy',
    email: 'stleisy@gmail.com',
    quantity: 1,
  };

  it('it takes an order quantity and puts it into the database and sends an email', async () => {
    const results = await request(app).post('/api/v1/orders').send(testUser);
    console.log('results:', results.body)
    expect(results.body).toEqual({
      id: '1',
      name: 'Steph Leisy',
      email: 'stleisy@gmail.com',
      quantity: 1,
    });
  });
});
