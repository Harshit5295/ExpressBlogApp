module.exports = (req, res, next) => {
    if(!req.files.image || !req.body.title || !req.body.subTitle || !req.body.content) {
        return res.redirect('/new-post')
    }
    next();
}