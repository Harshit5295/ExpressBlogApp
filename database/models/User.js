const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userBasicProfile = new mongoose.Schema({
    username : {type: String, required: [true, 'Please provide Usrname']},
    email : {type: String, unique : true, required: [true, 'Please provide Eamil']},
    password : {type: String, required: [true, 'Please provide Password']}
})

const dashboardSchema = new mongoose.Schema({
    profileImageUrl : String,
    dateOfBirth : String,
    contactNumber : String,
    collegeRollNumber : String,
    startYear : Number,
    endYear : Number,
    course : String,
    section : String,
    yearOfStudy : Number,
    semester : String,
    certifications : [{
        subject : String,
        startDate : Date,
        endDate : Date,
        institute : String,
        description : String,
    }],
    internships : [{
        title : String,
        startDate : Date,
        endDate : Date,
        company : String,
        description : String,
    }],
    additionalInfo : String,
})

const userSchema = new mongoose.Schema({
    basicDetails : userBasicProfile, 
    additionaDetails : dashboardSchema
})

userBasicProfile.pre('save', function(next){
    const user = this;
    bcryptjs.hash(user.password, 10, function(error, encryptedPassword) {
        user.password = encryptedPassword
        next();
    })
})

module.exports = mongoose.model('User', userSchema);