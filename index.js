const express = require('express');
const app = express();
const mongoose = require('mongoose');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const register1Route = require('./routes/register1');

mongoose.connect("mongodb://localhost/githubSite", {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Mongodbga ulanish amalga oshdi');
    })
    .catch((err) => {
        console.error("Mongodbga ulanishda xato yuz berdi");
    });

    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));

    app.get('/', async(req, res) => {
        res.render('index');
    });

    app.use('/register', registerRoute);
    app.use('/login', loginRoute);
    app.use('/', register1Route);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`${port} - portni eshtishni boshladik..`);
});