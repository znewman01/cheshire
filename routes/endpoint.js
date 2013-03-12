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
          client.close();
          res.send('200', 'Endpoint successfully created.');
        });
      } else {
        client.close();
        res.send(400, 'endpoint already exists'); // TODO is 400 the right response?
      }
    });
  });
};

exports.read = function(req, res) {
  var name = req.params.name;
  mongo.open(function(err, client) {
    var db = client.db(mongo_db);
    db.collection('endpoints').findOne({ name: name }, function(err, result){
      if (result) {
        var contents = result.contents;
        db.collection('endpoints').update({
          name: name
        }, {
          $set: { contents: '' }
        },function(err, result) {
          res.send(200, contents);
          client.close();
        });
      } else {
        res.send(404, 'echo Endpoint ' + name + ' not found');
        client.close();
      }
    });
  });
};

exports.update = function(req, res) {
  var name = req.params.name;
  var password = req.body.password;
  var contents = req.body.contents;
  mongo.open(function(err, client) {
    var db = client.db(mongo_db);
    db.collection('endpoints').findOne({ name: name }, function(err, result){
      if (result.password != password) {
        client.close();
        res.send(403, 'Incorrect password for endpoint');
      } else {
        db.collection('endpoints').update(
          { name: name },
          { $set: { contents: contents } },
          function(err, result){
            client.close();
            res.send(200, 'okay');
        });
      }
    });
  });
}
