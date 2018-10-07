const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username : {type: String, required: [true, 'Please provide Usrname']},
    email : {type: String, unique : true, required: [true, 'Please provide Eamil']},
    password : {type: String, required: [true, 'Please provide Password']}
})

userSchema.pre('save', function(next){
    const user = this;
    bcryptjs.hash(user.password, 10, function(error, encryptedPassword) {
        user.password = encryptedPassword
        next();
    })
})

module.exports = mongoose.model('User', userSchema);