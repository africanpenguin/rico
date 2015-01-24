module.exports.process = function (server, db) {
    server.get('/hello/:name', function (req, res, next) {
        res.send('hello ' + req.params.name);
    });
};
