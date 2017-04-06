const express = require('express');
const test = express.Router();

test.get('/', function index(req, res) {
  req.param('name');
  res.json({a: '3'});
});

module.exports = test;
