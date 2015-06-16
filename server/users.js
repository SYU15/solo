var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');

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

var User = mongoose.model('User', userSchema);

var testing = new User({ name: 'Silence', password: 'blah' });

testing.save(function(err, thor) {
  if (err) return console.error(err);
  console.log('success');
});

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

module.exports = User;