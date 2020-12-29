const express = require('express');
const db = require('./js/db-connection');
const path = require('path');
const env = require('./.env.json');
const polyline = require('@mapbox/polyline');
const app = express();
const port = env.serverPort
const PATH_COLOR = '3CB371';

app.use('/', express.static(__dirname));
app.use(express.json());

// GET
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/results', (req, res) => {
    db.getResults().then((results) => {
        res.send(results);
    });
});

// POST
app.post('/result', (req, res) => {
    const newResult = {
        date: new Date(),
        result: req.body.result,
        comment: req.body.comment || '',
        location: req.body.location || [],
        distance: req.body.distance || ""
    }
    console.log('saving new result:');
    console.log(newResult);
    db.createResult(newResult).then(id => {
        res.send(id);
    });
});
app.post("/locationMap",function(req, res){
    const url = getImagePath(req.body.coords);
    res.send({url: url});
});

const getImagePath = (coords) => {
    if (coords && coords.length > 0) {
        const MAP_BOX_API_KEY = env.mapKey
        const firstCoord = coords[0];
        const lastCoord = coords[coords.length - 1];
        const startMarker = `pin-s-a+${PATH_COLOR}(${firstCoord[1]},${firstCoord[0]})`;
        const endMarker = `pin-s-b+${PATH_COLOR}(${lastCoord[1]},${lastCoord[0]})`;
        const pathWithGradient = makePath(coords) + ',' + startMarker + ',' + endMarker;
        const imageURL = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${encodeURIComponent(pathWithGradient)}/auto/200x200@2x?access_token=${MAP_BOX_API_KEY}`;
        return imageURL;
    }
    return '';
}
const makePath = (coords) => {
    const pathStrings = [];
    const strokeWidth = 4;

    for (let i = 0; i < coords.length - 1; i++) {
        const path = polyline.encode([coords[i], coords[i + 1]]);
        pathStrings.push(`path-${strokeWidth}+${PATH_COLOR}(${path})`); // format from https://docs.mapbox.com/api/maps/#path
    }

    return pathStrings.join(',');
}

app.listen(port, () => {
    console.log(`Life24 app listening at http://localhost:${port}`)
});
