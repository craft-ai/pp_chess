const express = require('express');
const bodyParser = require('body-parser');

const { addRequestId } = require('./middlewares/misc');
const { errorHandler, error404 } = require('./middlewares/error');
const { SERVER_PORT } = require('./shared/constants');
const router = require('./api');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(addRequestId);

server.use('/api', router);

server.use(errorHandler);
server.use(error404);

server.listen(SERVER_PORT);

console.log(`Server started, listening on port: ${SERVER_PORT}`);
