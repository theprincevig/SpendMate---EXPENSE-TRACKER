const express = require('express');
const { getExchangeRate } = require('../controller/exchangeRate.controller.js');

const router = express.Router();

router.get("/", getExchangeRate);

module.exports =  router;