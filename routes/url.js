// packages needed in this file
const express = require('express')
const shortid = require('shortid')
const isValidURL = require('url-validation');

// const uiInput = require('ui.html')
//express route handler
const router = express.Router()

//import url db model
const url = require('../models/UrlModel')

//api base url endpoint
const baseUrl = 'http:localhost:5000'

// function url_input() {
//     const input = document.getElementById(url_input)
//     console.log(`%{input}`)
// }

router.post('/shorter', async (req, res) => {
    const {
        longUrl
    } = req.body //destructure the longUrl from req.body.longUrl
    // const input = document.getElementById(url_input)
    // url_input()
    console.log(longUrl, "long Url")
    //if validation success, create url code
    const urlCode = shortid.generate()
    console.log("baseurl code generated", urlCode)
    //validate long url using validUrl.isUri method
    if(isValidURL(longUrl) === true) {
    //if(utils.validateUrl(longUrl)) {
    //if(validUrl.isUri(longUrl)) {
        try {
            //check url in db else create it using findOne()
            let Url = await url.findOne({
                longUrl
            })
            //let Url = longUrl
            //let url = longUrl
            console.log(Url, "url")

            if (Url) {
                res.json(Url)
                //console.log(Url)
            } else {
                //join short code and base url to create short url
                const shortUrl = baseUrl + '/' + urlCode
                console.log(shortUrl, " short url")
                //invoking the url model and saving to the db
                Url = new url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await Url.save()
                //res.json(Url)
                res.send(res.json(Url))
                console.log(Url)
            }
        }
        //exception handling
        catch (error) {
            console.log(error)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = router