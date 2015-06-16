var request = require('request');
var User = require('./app.js');
var mongoose = require('mongoose');

exports.getData = function(res, req){
  console.log(User);
  User.User.findOne({}).exec(function(err,user) {
    if(err){
      console.log(err);
    }
    if(user){
      req.send(200, user);
    }
  });
};
exports.updateData = function(res, req){
  console.log(req.body);
};