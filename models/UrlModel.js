const mongoose = require('mongoose')

//initiate mongoose schema
const URLSchema = new mongoose.Schema({
    urlCode: String, //unique id stored of each URL
    longUrl: String, //default url to convert/shortened
    shortUrl: String, //end result/short url
    date: {
        type: String,
        default: Date.now
    }
})


//create a model for schema and export it
module.exports = mongoose.model('Url', URLSchema)