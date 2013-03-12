/*
 * GET install script
 */

var db = require('../db');

var mongo = db.mongo;
var mongo_db = db.mongo_db;

exports.install = function(host, port) {
  return function(req, res){
    var name = req.params.name;
    mongo.open(function(err, client) {
      var db = client.db(mongo_db);
      db.collection('endpoints').count({ 'name': name }, function(err, found){
        if (!found) {
          res.render('install', { host: host, port: port, name: name });
        } else {
          res.render('taken', { name: name });
        }
        client.close();
      });
    });
  };
};
