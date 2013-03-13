/*
 * Routes for administering from the web.
 */

var bcrypt = require('bcrypt');

var mongo = require('mongodb').MongoClient;
var mongo_uri = process.env.MONGO_URI;

exports.update_form = function(req, res) {
  res.render('update', { title: 'Update', error: '' });
};

exports.update = function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var scriptlet = req.body.scriptlet;
  mongo.connect(mongo_uri, function(err, db) {
    db.collection('endpoints').findOne({name: name}, function(err, endpoint) {
      if (!endpoint) {
        db.close();
        res.render('update', {
          title: 'Update',
          error: 'No endpoint ' + name + ' found.'
        });
      } else {
        bcrypt.compare(password, endpoint.password, function(err, match) {
          if (match) {
            db.collection('endpoints').update(
              { name: name },
              { $set: { contents: scriptlet } },
              function(err, result){
                db.close();
                res.render('success', {title: 'Update Succesful'});
            });
          } else {
            db.close();
            res.render('update', {
              title: 'Update',
              error: 'Incorrect password for user ' + name + '.'
            });
          }
        });
      }
    });
  });
};
