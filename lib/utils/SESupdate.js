require('dotenv').config();
const AWS = require('aws-sdk');
// const SES = require('aws-sdk/clients/ses');

const sendingUpdateEmail = (name, email, quantity) => {
  const params = {
    Destination: {
      ToAddresses: [email], // Email address/addresses that you want to send your email
    },
    // ConfigurationSetName: 'test',
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: 'UTF-8',
          Data: `Thanks ${name}! Your modified hot dog bun order is now set to ${quantity} hot dog buns`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Thanks ${name}! Your modified hot dog bun order is now set to ${quantity} hot dog buns`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Your hot dog bun order has been modified',
      },
    },
    Source: 'stleisy@gmail.com',
  };

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });
  console.log(AWS.config, 'hi');
  console.log('hello');

  const ses = new AWS.SES({ apiVersion: '2010-12-01' });

  const sendEmail = ses.sendEmail(params).promise();
  // sendEmail;
  sendEmail
    .then((data) => {
      console.log('email submitted to SES', data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  sendingUpdateEmail,
};
