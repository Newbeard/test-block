const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const config = (app) => {
  // USE
  app.use(cors({
    origin: ['http://localhost:3000', 'https://test-block-app.herokuapp.com/'],
    credentials: true,
  }));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(fileUpload());
  app.use(cookieParser());
};

module.exports = config;
