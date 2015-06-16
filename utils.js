var request = require('request');
var User = require('./app.js');
var mongoose = require('mongoose');

exports.getData = function(res, req){
  console.log(res.body.dumpling);
  // console.log(User);
  // console.log(req.body.data);
  User.User.findOne({'dumpling': res.body.dumpling}).exec(function(err,user) {
    if(err){
      console.log(err);
    }
    if(user){
      req.send(200, user);
    }
  });
};
exports.updateData = function(res, req){
  User.User.update({'dumpling': res.body.name}, 
    { $set: { 'age': res.body.age, 'health': res.body.health, 
  'intelligence': res.body.intelligence, 'juiciness': res.body.juiciness,
'type': res.body.type, 'image': res.body.image}},
    function(err){
      if(err){
        console.log(err);
      } else{
        console.log('saved');
      }
    });
  req.send(200, user);
};