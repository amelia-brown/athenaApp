'use strict'
const parseurl = require('parseurl');
const express = require('express');

module.exports = {
  bodyParser: require('body-parser'),
  morgan: require('morgan'),
  json2xls: require('json2xls'),
  express: express,
  session: require('express-session'),
  router: express.Router,
  chalk: require('chalk'),
  urls: require('./urls.js'),
  request: require('request'),
  path: require('path'),
  sessionPageViews(req, res, next) {
    let views = req.session.views;
    if(!views)
      views = req.session.views = {};
    let pathname = parseurl(req).pathname;
    views[pathname] = (views[pathname] || 0) + 1;
    next();
  }
}
