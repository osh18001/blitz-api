const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/seed');

const server = awsServerlessExpress.createServer(seed);

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
