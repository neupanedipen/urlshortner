const express = require('express');
const axios = require('axios');
const { customAlphabet } = require('nanoid');
const ShortURL = require('../model/model');
const route = express.Router();

//nanoID
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8)

route.get('/', (req, res) => {

    res.render("index")

})

route.post('/', (req, res) => {
    const url = req.body.url;
    if (!url) {
        res.send({ message: "Please provide a valid url" })
    }

    const newShortUrl = new ShortURL({
        url: url,
        shortId: nanoid()
    })

    newShortUrl.save()
        .then(result => {
            res.redirect('/all-links')
        })
        .catch(err => console.log(err));
})

route.get('/api/all-links', (req, res) => {
    ShortURL.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

route.get('/all-links', (req, res) => {
    axios.get('http://localhost:8080/api/all-links')
        .then(response => {
            res.render("all-links", {
                links: response.data
            })
        })
        .catch(err => console.log(err))
})

route.get('/:shortID', async (req, res) => {
    const shortId = req.params.shortID;

    const shortenUrl = await ShortURL.findOne({ shortId: shortId })
    if (shortenUrl == null) return res.sendStatus(404)

    res.redirect(shortenUrl.url)

})

module.exports = route;