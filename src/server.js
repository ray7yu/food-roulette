const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./user');
const withAuth = require('./middleware');
const app = express();

require('dotenv').config()

const secret = process.env.SECRET;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
mongoose.connect("mongodb://127.0.0.1:27017/details", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
});
app.get('/ping', function(req, res) {
    return res.send('pong');
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/api/signup', function(req, res) {
    res.send('Welcome!');
});
app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
});
app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});
app.post('/api/register', function(req, res) {
    const {email, password} = req.body;
    const newUser = new User({email, password});
    User.findOne({email}, function(err, user){
        if(err) {
            console.log(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if(!user){
            newUser.save(function(err) {
                if (err) {
                    res.status(500)
                        .send("Error registering new user, please try again.");
                } else {
                    res.status(200).send("Welcome to the club!");
                }
            });
        } else {
            res.status(400)
                .json({
                    error: 'Cannot have same email'
                });
        }
    })
});
app.post('/api/authenticate', function(req, res) {
    const {email, password} = req.body;
    User.findOne({email}, function(err, user){
        if(err) {
            console.log(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function(err, same) {
                if(err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    //Issue token
                    const payload = {email};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, {httpOnly:true})
                        .sendStatus(200);
                }
            })
        }
    })
})
app.listen(process.env.PORT || 8080);
