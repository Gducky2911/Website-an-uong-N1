const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') } else { console.log('Err In Connect MongoDB: ' + err) }
});
const conn = mongoose.connection;
require("./Modules/users");