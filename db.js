var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

exports.mongo = new MongoClient(new Server('localhost', 27017));
exports.mongo_db = 'test'
