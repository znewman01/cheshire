
/*
 * GET home page.
 */

exports.index = function(host, port){
  return function(req, res){
    res.render('index', { title: 'Home', host: host, port: port });
  };
};
