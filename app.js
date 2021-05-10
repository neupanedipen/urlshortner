const express = require('express');
const dotenv = require('dotenv');
const { customAlphabet } = require('nanoid');
const ShortURL = require('./model/model')
const connectDB = require('./db/connection');
const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 3000;

//connection to DB
connectDB();

//nanoID
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8)

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/', (req, res) => {
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

app.get('/all-links', (req, res) => {
    ShortURL.find()
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.get('/:shortID', async (req, res) => {
    const shortId = req.params.shortID;

    const shortenUrl = await ShortURL.findOne({ shortId: shortId })
    if (shortenUrl == null) return res.sendStatus(404)

    res.redirect(shortenUrl.url)

})

app.listen(PORT, () => {
    console.log(`Up and running at port ${PORT}`)
})