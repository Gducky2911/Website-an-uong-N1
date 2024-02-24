const users = require('../Controllers/UserController');
const places = require('../Controllers/PlaceController');
const categories = require('../Controllers/CategoryController');
const posts = require('../Controllers/PostController');
const admin = require('../Controllers/AdminController');

module.exports = {
    configRoute: app => {
        app.use('/user', users);
        app.use('/place', places);
        app.use('/category', categories);
        app.use('/post', posts);
        app.use('/admin', admin);
    }
};