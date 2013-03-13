/*
 * POST create a route
 */

var bcrypt = require('bcrypt');

var mongo = require('mongodb').MongoClient;
var mongo_uri = process.env.MONGO_URI;

exports.create = function(req, res) {
  var name = req.params.name;
  mongo.connect(mongo_uri, function(err, db) {
    db.collection('endpoints').count({ name: name }, function(err, found){
      if (!found) {
        var password = req.body.password;
        bcrypt.hash(password, 10, function(err, hash){
          db.collection('endpoints').insert({
            name: name,
            password: hash,
            contents: '#!/bin/sh\ntouch /tmp/cheshire'
          }, function(err, result) {
            db.close();
            res.send(200, 'Endpoint successfully created.\n');
          });
        });
      } else {
        db.close();
        res.send(302, 'Endpoint ' + name + ' already exists.\n');
      }
    });
  });
};

exports.read = function(req, res) {
  var name = req.params.name;
  mongo.connect(mongo_uri, function(err, db) {
    db.collection('endpoints').findOne({ name: name }, function(err, result){
      if (result) {
        var contents = result.contents;
        db.collection('endpoints').update({
          name: name
        }, {
          $set: { contents: '' }
        },function(err, result) {
          res.send(200, contents);
          db.close();
        });
      } else {
        res.send(404, 'Endpoint ' + name + ' not found\n');
        db.close();
      }
    });
  });
};

exports.update = function(req, res) {
  var name = req.params.name;
  var password = req.body.password;
  var contents = req.body.contents;
  mongo.connect(mongo_uri, function(err, db) {
    db.collection('endpoints').findOne({ name: name }, function(err, result){
      bcrypt.compare(password, result.password, function(err, match) {
        if (match) {
          db.collection('endpoints').update(
            { name: name },
            { $set: { contents: contents } },
            function(err, result){
              db.close();
              res.send(200, 'Endpoint successfully updated.\n');
          });
        } else {
          db.close();
          res.send(401, 'Incorrect password for endpoint.\n');
        }
      });
    });
  });
}

exports.delete = function(req, res) {
  var name = req.params.name;
  var password = req.body.password;
  mongo.connect(mongo_uri, function(err, db) {
    db.collection('endpoints').findOne({ name: name }, function(err, result){
      bcrypt.compare(password, result.password, function(err, match) {
        if (match) {
          db.collection('endpoints').remove(
            { name: name },
            function(err, result) {
              db.close();
              res.send(200, 'Endpoint successfully removed.\n');
          });
        } else {
          db.close();
          res.send(401, 'Incorrect password for endpoint.\n');
        }
      });
    });
  });
}
