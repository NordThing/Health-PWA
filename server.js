const express = require('express');
const db = require('./js/db-connection');
const path = require('path');
const app = express();
const port = 3001;

app.use('/views', express.static(__dirname + '/views'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/sw.js', express.static(__dirname, {index: 'sw.js'}));
app.use('/manifest.json', express.static(__dirname, {index: 'manifest.json'}));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/results', (req, res) => {
    db.getResults().then((results) => {
        res.send(results);
    });
});
app.post('/result', (req, res) => {
    const newResult = {
        date: new Date(),
        result: req.body.result,
        comment: req.body.comment || '',
        location: req.body.location || null
    }
    db.createResult(newResult).then(id => {
        res.send(id);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
