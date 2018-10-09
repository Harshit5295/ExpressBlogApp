const User = require('../database/models/User');

module.exports = async(req, res) => {
    const users = await User.findOne({"username" : "Harshit"})
    console.log(users);
    res.render('dashboard', {
        users
    })
};