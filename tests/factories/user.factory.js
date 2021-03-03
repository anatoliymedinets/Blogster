const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = async () => {
  const existingUser = await User.findOne({ email: 'test@gmail.com'})

  if(existingUser) {
    return existingUser;
  }

  return new User({
    fullName: 'Test User',
    email: 'test@gmail.com',
    password: 12345,
    googleId: '603ae44057cfb538a86f7e23', 
  }).save();
}