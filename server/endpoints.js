module.exports.process = function (server, db) {
  var collection = db.collection('events');

  server.get('/test', function (req, res, next) {
    res.send({'data': Date.now()});
    next();
  });
};
