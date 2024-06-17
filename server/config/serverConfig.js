const express = require('express');
const cookieParser = require('cookie-parser');
const { verifyAccessToken } = require('../middleware/verifyJWT');

const serverConfig = (app) => {
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: 'true' }));
  app.use(express.json());
  app.use(verifyAccessToken);
};

module.exports = serverConfig;
