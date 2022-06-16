'use strict';
const server = require('./src/server');
const {sequelize} = require('./src/auth/models/index')

require('dotenv').config();
const PORT = process.env.PORT || 3080;

console.log("Kick OFF");

sequelize.sync().then(()=>{
    server.start(PORT);
}).catch((err) => {
    console.log('-------', err);
  });
