const express = require('express');
const db = require('./js/db-connection');
const path = require('path');
const app = express();
const port = 3001;

app.use('/', express.static(__dirname));
app.use(express.json());

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
        location: req.body.location || []
    }
    console.log('saving new result:');
    console.log(newResult);
    db.createResult(newResult).then(id => {
        res.send(id);
    });
});

app.listen(port, () => {
    console.log(`HealthPWA app listening at http://localhost:${port}`)
});
