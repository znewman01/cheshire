/*
 * POST create a route
 */

var db = require('../db')

var mongo = db.mongo;
var mongo_db = db.mongo_db;

exports.create = function(req, res) {
  var name = req.params.name;
  mongo.open(function(err, client) {
    var db = client.db(mongo_db);
    db.collection('endpoints').count({ name: name }, function(err, found){
      if (!found) {
        var password = req.body.password;
        db.collection('endpoints').insert({
          name: name,
          password: password, // TODO hash+salt
          contents: '#!/bin/sh\ntouch /tmp/cheshire'
        }, function(err, result) {
          res.send('200', 'Endpoint successfully created.');
        });
      } else {
        res.send(400, 'endpoint already exists'); // TODO is 400 the right response?
      }
      client.close();
    });
  });
};
