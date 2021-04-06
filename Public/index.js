const div = document.getElementById('main-element');
const list = document.getElementById('');
const p = document.createElement('p');
p.textContent = 'Welcome To The Hot Dog Bun Store';
const form = document.createElement('form');

const input1 = document.createElement('input');
const input2 = document.createElement('input');
const input3 = document.createElement('input');
const button = document.createElement('button');
input1.placeholder = 'What is your name?';
input1.type = 'text';
input1.name = 'name';
input2.placeholder = 'What is your email?';
input2.type = 'text';
input2.name = 'email';
input3.placeholder = 'How many buns?';
input3.type = 'number';
input3.name = 'quantity';
button.textContent = 'order';
form.append(input1, input2, input3, button);
div.append(p, form);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  fetch('https://amazon-ses-build.herokuapp.com/api/v1/orders', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.get('name'),
      email: 'stleisy@gmail.com',
      itemId: '1',
      quantity: formData.get('quantity'),
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const div2 = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = `Thank you ${res.name} for your order of ${res.quantity} hot dog buns. Check your email for further confirmation.`;
      const modifyButton = document.createElement('button');
      modifyButton.textContent = 'Change your order?';
      div.append(p, modifyButton);

      modifyButton.addEventListener('click', () => {
        window.location.href = `./modify-orders/?id=${res.id}`;
      });
    });
});
