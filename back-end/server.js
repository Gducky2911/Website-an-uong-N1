require('dotenv').config();

const express = require('express');
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

//mongo
const mongoLib = require('./libs/mongodb');
mongoLib.init();

const IndexRouter = require("./routes/index");
IndexRouter.configRoute(app);

app.listen(process.env.HTTP_PORT, process.env.HTTP_HOST, function () {
    console.log(
        `Server listen on port: ${process.env.HTTP_HOST} host:${process.env.HTTP_PORT}`
    );
});
