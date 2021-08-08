const express = require("express")
const app = express()
const http = require('http')
const fs = require('fs')
//Database config
const connection = require('./config/db.config')
connection.once('open', () => console.log('DB Connected: index'))
connection.on('error', () => console.log('Error: index'))

//routes config
app.use(express.json({
    extended: false
})) //parse the incoming request body in JSON format
app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('ui.html').pipe(res)
})
//listen for incoming requests
const PORT = process.env.PORT || 5000
server.listen(PORT, () =>
    console.log('Server has started, listening on port: ', PORT)) //call back function on successful connection

