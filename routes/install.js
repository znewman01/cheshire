/*
 * GET install script
 */

exports.install = function(req, res){
  var name = req.params[0]
  res.render('install', { name: name });
};
