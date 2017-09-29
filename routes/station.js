var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({"contactPoints": [process.env.ENDPOINT], "keyspace": "dev"});
var Promise = require('bluebird');

function getforstation(stationname) {
  return client.execute(`SELECT time, value from dev.measures WHERE station_id='${stationname}' LIMIT 1000;`)
}

function getstationtime(stationname, date) {
  return client.execute(`SELECT time, value from dev.station_day WHERE station_id='${stationname}' AND date = '${date}';`)
}

function getdate(date) {
  return client.execute(`SELECT station_id, time, value from dev.days WHERE date = '${date}';`)
}

/* GET home page. */
router.get('/station', function(req, res, next) {
  getforstation(req.query.station)
  .then((result) =>
    res.json(result.rows));
});

router.get('/stationtime', function(req, res, next) {
  getstationtime(req.query.station, req.query.date)
  .then((result) =>
    res.json(result.rows));
});

router.get('/date', function(req, res, next) {
  getdate(req.query.date)
  .then((result) =>
    res.json(result.rows));
});

module.exports = router;
