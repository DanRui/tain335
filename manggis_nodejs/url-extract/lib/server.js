module.exports = (function () {
  'use strict';
  var connect = require('connect')
    , valid = require('./valid')
    , extract = require('./extract');

  var app = connect()
            .use(connect.logger('dev'))
            .use('/snapshot/campaign', connect.static('./snapshot/campaign'))
            .use('/snapshot/campaign', require('./unkonw')())
            .use('/snapshot/template', connect.static('./snapshot/template'))
            .use(connect.query())
            .use(connect.bodyParser())
            .use('/campaign/snapshot', require('./snapshot'))
            .use('/urls', function (req, res, next) {
              if (req.method !== 'POST') return next();
              var listId = req.body.listId
                , campaignId = req.body.campaignId
                , urls = req.body.urls;
              if (listId && campaignId && urls) {
                valid(listId, campaignId, urls, function (results) {
                  var data = {
                    code: 0,
                    urls: results
                  };
                  res.writeHead(200, {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                  });
                  res.statusCode = 200;
                  return res.end(JSON.stringify(data));
                });
              } else {
                next();
              }
            })
            .use('/getExtract', function (req, res, next) {
              if (req.query.url) {
                var url = req.query.url;
                extract.getExtract(url, function (err, data) {
                  if (err) {
                    data = {
                      code: 1
                    };
                  }
                  res.writeHead(200, {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                  });
                  res.statusCode = 200;
                  return res.end(JSON.stringify(data));
                });
              } else {
                next();
              }
            })
            .use('/extract', function (req, res, next) {
              if (req.query.url) {
                extract.one(req.query.url, function (data) {
                  res.writeHead(200, {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                  });
                  res.statusCode = 200;
                  return res.end(JSON.stringify(data));
                });
              } else {
                next();
              } 
            })
            .use('/check', function (req, res, next) {
              if (req.query.url) {
                valid.uv(req.query.url, function (err, v) {
                  if (err) console.log(err);
                  res.writeHead(200, {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                  });
                  res.statusCode = 200;
                  console.log('v === ' + v);
                  return res.end(JSON.stringify({
                    status: v ? 1 : 0
                  }));
                })
              } else {
                next();
              }
            })
            .use('/saveUrl', require('./saveUrl'))
            .listen(80);
})();
