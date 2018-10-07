const express  = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const edge = require('edge.js');
const cloudinary = require('cloudinary');
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const storeUserController = require('./controllers/storeUser');
const getSinglePostController = require('./controllers/getSinglePost');
const aboutController = require('./controllers/aboutController');
const contactController = require('./controllers/contactController');
const registerController = require('./controllers/createUser');
const loginController = require('./controllers/loginController');
const checkLoginController = require('./controllers/checkLogin');
const authLogoutController = require('./controllers/logoutController');
const storePost = require('./middleware/storePost');
const authRedirect = require('./middleware/redirectAuth');
const auth = require('./middleware/auth');
const app = new express();
const mongoStore = connectMongo(expressSession);

mongoose.connect('mongodb://localhost/node-js-blog');

app.use(connectFlash());
app.use(fileUpload());
app.use(expressSession({
    secret : 'secret',
    store : new mongoStore({
        mongooseConnection : mongoose.connection
    })
}))
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
})
cloudinary.config({
    api_key : '436987147148213',
    api_secret : 'uDjLAnnIoTlhk9uSXXK2MiCsfIU',
    cloud_name : 'dierkuc3u'
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}))
app.use('/posts/store', storePost);

app.get('/', homePageController);
app.get('/new-post', auth, createPostController);
app.get('/post/:id', getSinglePostController);
app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/register', authRedirect, registerController);
app.get('/login', authRedirect, loginController);
app.get('/logout', auth, authLogoutController);
app.post('/posts/store', auth, storePost, storePostController);
app.post('/users/register', authRedirect, storeUserController);
app.post('/users/login', authRedirect, checkLoginController);
app.use((req, res) => res.render('not-found'));


app.listen(9000, () => {
    console.log("App running on port 9000");
})