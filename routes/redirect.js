const express = require('express')

const router = express.Router()

const urls = require('../models/UrlModel')

router.get('/:code', async (req, res) => {
    try {
        //find the url
        const urlCode = req.params.code

        console.log(urlCode, "urlCode")
        const foundUrl = await urls.findOne({
            urlCode
        })
       console.log(foundUrl, "foundUrl")
        if (foundUrl) {
            //on validation success, perform redirect
            console.log(foundUrl.longUrl)
            return res.redirect(foundUrl.longUrl)
        } else {
            return res.status(404).json('No URL found')
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json('Server Error')
    }
    })

module.exports = router