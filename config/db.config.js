//import mongoose package
const mongoose = require('mongoose')

//declare database string URI
const db_uri = ''

let database;
//create a db connection
mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    },
    (err, db) => {
        if(err) throw err;
        database = db;
    });

const connection = mongoose.connection

//export the connection object
module.exports = connection