const express = require('express');

const app = new express();

const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const validateMiddleware = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

app.use(flash());

app.use(expressSession({
secret: 'keyboard cat',
resave : false,
saveUninitialized : false
}));

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use(express.static('public'));

global.loggedIn = null;

app.use("*", (req, res, next) => {
   loggedIn = req.session.userId;
   next()
});

app.use('/posts/store',validateMiddleware);

app.post('/posts/store',authMiddleware, storePostController);

app.get('/',homeController);

app.get('/post/:id',getPostController);

app.get('/posts/new',authMiddleware,newPostController);

app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController);

app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController);

app.get('/auth/logout', logoutController);

app.get('/about',(req,res)=>{
  res.render('about');
});

app.get('/contact',(req,res)=>{
  res.render('contact');
});

app.use((req, res) => res.render('notfound'));

mongoose
  .connect(
    "mongodb+srv://TweetAppUser:TweetAppPassword@tweetappcluster.xhtqi.mongodb.net/BlogAppDB?retryWrites=true&w=majority"
  )
  .then(result => {
    app.listen(2828);
  })
  .catch(err => console.log(err));