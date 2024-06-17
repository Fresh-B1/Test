require('dotenv').config();
const express = require('express');
const app = express();
const serverConfig = require('./config/serverConfig');

const indexRouter = require('./routes/index.router');

serverConfig(app);

app.use('/', indexRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту.`);
});
