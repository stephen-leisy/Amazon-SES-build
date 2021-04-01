require('dotenv').config();
const AWS = require('aws-sdk');
// const SES = require('aws-sdk/clients/ses');

const sendAnEmail = (recipient, message) => {
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });
  
  const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  
  const params = {
    Destination: {
      ToAddresses: [ recipient], // Email address/addresses that you want to send your email
    },
    ConfigurationSetName: 'test',
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: 'UTF-8',
          Data:
            "",
        },
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email',
      },
    },
    Source: 'stleisy@gmail.com',
  };
  
  const sendEmail = ses.sendEmail(params).promise();
  
  return sendEmail
    .then((data) => {
      console.log('email submitted to SES', data);
    })
    .catch((error) => {
      console.log(error);
    });

    // return sendEmail;
}
module.exports = {
    sendAnEmail,
};