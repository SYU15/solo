var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var utils = require('./utils.js');
var partials = require('express-partials');
// var db = require('server/config.js');

var app = express();
app.use(partials());
app.use(express.bodyParser());
var mongoURI = 'mongodb://localhost/test';
mongoose.connect(mongoURI);

// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
 var userSchema = mongoose.Schema({
    username: { type: String, index: { unique: true } },
    password: String,
    dumpling: String,
    age: Number,
    health: Number,
    intelligence: Number,
    juiciness: Number,
    type: String
  });
  exports.User = User = mongoose.model('User', userSchema);
  User.comparePassword = function(candidatePassword, savedPassword, cb) {
    bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

  userSchema.pre('save', function(next){
    var cipher = bluebird.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
      .then(function(hash) {
        this.password = hash;
        next();
      });
  });
});

app.get('/data', utils.getData);

app.use(express.static(__dirname + '/client'));

app.listen(8080);