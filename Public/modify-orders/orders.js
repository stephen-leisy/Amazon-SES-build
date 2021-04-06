const params = new URLSearchParams(window.location.search);
const orderId = params.get('id');
const div = document.getElementById('splash-zone');
// const url = 'http://localhost:7890/api/v1/orders/';

fetch(`/api/v1/orders/${orderId}`)
  .then((res) => res.json())
  .then((data) => {
    const p = document.createElement('p');
    p.textContent = `Hi there ${data.name}. You currently have an order for ${data.quantity} hot dog buns. Would you like to change your order?`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Order';
    div.append(p, deleteButton);
    deleteButton.addEventListener('click', () => {
      fetch(`/api/v1/orders/${orderId}`, {
        method: 'DELETE',
        body: JSON.stringify({
          quantity: data.quantity,
          name: data.name,
          itemId: '1',
          email: 'stleisy@gmail.com',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const p1 = document.createElement('p');
          p1.textContent = `Your order has been deleted.`;
          div.append(p1);
        });
    });
    console.log(data);
  });
