const express = require('express');
const dotenv = require('dotenv');
const route = require('./routes/route')

const connectDB = require('./db/connection');
const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 3000;

//connection to DB
connectDB();


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))

app.use('/', route)

app.listen(PORT, () => {
    console.log(`Up and running at port ${PORT}`)
})