const express = require('express');
const server = express();
const config = require('./config.json');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.static('./public'));
server.set('view engine', 'hbs');
server.use('/data/', require('./data/dataHandler.js'));

server.get('/', (req, res) => {
    res.render('index.hbs');
});

server.get('/news/', (req, res) => {
    res.render('news.hbs');
});

server.get('/newsManagement/:id', (req, res) => {
    if(req.params.id != config.NEWSMANAGERPASS) {
        res.send('Access deniled, wrong passowrd');
    } else {
        res.render('newsAdmin.hbs');
    }
});

server.get('/admin/:id', (req, res) => {
    if(req.params.id != config.ADMINACCESSPASS) {
        res.send('Access deniled, wrong passowrd');
    } else {
        res.render('admin.hbs');
    }
});

server.listen(port, () => {console.log(`Server running on Port: ${port}`)});