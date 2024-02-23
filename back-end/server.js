require('dotenv').config();
const db = require('./database');

const users = require('./Controllers/UserController');
const places = require('./Controllers/PlaceController');
const categories = require('./Controllers/CategoryController');
const posts = require('./Controllers/PostController');
const admin = require('./Controllers/AdminController');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
var session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT, function() {
    console.log('Server Started');
});

app.use('/user', users);
app.use('/place', places);
app.use('/category',categories);
app.use('/post',posts);
app.use('/admin',admin);