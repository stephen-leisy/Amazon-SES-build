require('dotenv').config();
const AWS = require('aws-sdk');
// const SES = require('aws-sdk/clients/ses');

const sendingDeleteEmail = () => {
  const params = {
    Destination: {
      ToAddresses: ['stleisy@gmail.com'], // Email address/addresses that you want to send your email
    },
    // ConfigurationSetName: 'test',
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: 'UTF-8',
          Data: `You might have messed up here. You will no longer will receive hot dog buns`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: '',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Its too bad that you no longer want hot dog buns.',
      },
    },
    Source: 'stleisy@gmail.com',
  };

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

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
  sendingDeleteEmail,
};
