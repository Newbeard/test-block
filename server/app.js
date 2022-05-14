require('dotenv').config();
const express = require('express');
const config = require('./config/config');
const checkConect = require('./helpers/checkConect');
const indexRouter = require('./routes/index.router');

const PORT = process.env.PORT || 4000;

const app = express();

config(app);

app.use('/', indexRouter);

app.listen(PORT, async () => {
  checkConect(PORT);
});
