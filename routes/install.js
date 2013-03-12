/*
 * GET install script
 */


exports.install = function(host, port) {
  return function(req, res){
    var name = req.params[0];
    res.render('install', { host: host, port: port, name: name });
  };
};
