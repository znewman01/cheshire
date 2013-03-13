/*
 * GET install script
 */

var mongo = require('mongodb').MongoClient;
var mongo_uri = process.env.MONGO_URI;

exports.install = function(host, port) {
  return function(req, res){
    var name = req.params.name;
    mongo.connect(mongo_uri, function(err, db) {
      db.collection('endpoints').count({ name: name }, function(err, found){
        if (!found) {
          res.render('install', { host: host, port: port, name: name });
        } else {
          res.render('taken', { name: name });
        }
        db.close();
      });
    });
  };
};

exports.uninstall = function(host, port) {
  return function(req, res){
    var name = req.params.name;
    mongo.connect(mongo_uri, function(err, db) {
      db.collection('endpoints').count({ name: name }, function(err, found){
        if (found) {
          res.render('uninstall', { host: host, port: port, name: name });
        } else {
          res.send(404, 'Endpoint not found.\n');
        }
        db.close();
      });
    });
  };
};
