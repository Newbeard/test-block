const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const corsConfig = {
  // origin: true,
  origin: ['http://localhost:3000', 'https://blokc.herokuapp.com/'],
  credentials: true,
};

const config = (app) => {
  // USE
  app.use(cors(corsConfig));
  app.use(express.static(path.join(process.env.PWD, 'build')));
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(fileUpload());
  app.use(cookieParser());
};

module.exports = config;
