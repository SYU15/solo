var request = require('request');
var User = request('app.js');

exports.getData = function(res, req){
  User.find({}).exec(function(err,user) {
    res.send(200, user);
  })
};