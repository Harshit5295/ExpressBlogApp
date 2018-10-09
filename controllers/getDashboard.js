const User = require('../database/models/User');

module.exports = async(req, res) => {
    const users = await User.findOne({"_id" : "5bbc9c0d992ae0737d014e2b"})
    console.log(users);
    res.render('dashboard', {
        users
    })
};