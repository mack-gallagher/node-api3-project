const express = require('express');
const middleware = require('./middleware/middleware');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(middleware.logger);

// global middlewares and the user's router need to be connected here

const userRouter = require('./users/users-router');
console.log(userRouter);
server.use('/api/users', userRouter);

module.exports = server;
