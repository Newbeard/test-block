const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const corsConfig = {
  // origin: true,
  origin: ['http://localhost:3000', 'https://test-block-app.herokuapp.com/'],
  credentials: true,
};

const config = (app) => {
  // USE
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.static('public'));
  app.use(fileUpload());
  app.use(cookieParser());
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));
};

module.exports = config;
