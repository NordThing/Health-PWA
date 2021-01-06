const express = require('express');
const db = require('./js/db-connection');
const path = require('path');
const env = require('./.env.json');
const polyline = require('@mapbox/polyline');
const https = require('https');
const Stream = require('stream').Transform;
const cors = require('cors');
const app = express();
const port = env.serverPort
const RUNNING_PATH_COLOR = '3CB371';
const WALKING_PATH_COLOR = 'b33c7e';
let PATH_COLOR = RUNNING_PATH_COLOR;

app.use('/', express.static(__dirname));
app.use(express.json());

// cors
const allowlist = ['https://life24.app/', 'https://www.life24.app/']
const corsOptionsDelegate = function (req, callback) {
  const corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// GET
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/results', cors(corsOptionsDelegate), (req, res) => {
    db.getResults().then((results) => {
        res.send(results);
    });
});

// POST
app.post('/result', (req, res) => {
    const newResult = {
        date: new Date(),
        result: req.body.result,
        activity: req.body.activity,
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
app.post("/locationMap", (req, res) => {
    const url = getImagePath(req.body.coords, req.body.activity);
    if (url !== null) {
        https.get(url, thisRes => {
            const data = new Stream();
            thisRes.on('data', chunk => {
                data.push(chunk);
            });
            thisRes.on('end', () => {
                res.setHeader('Content-type', 'application/octet-stream');
                res.send(data.read());
            })
        }).on('error', err => {
            console.log(err.message);
            res.sendStatus(500);
        });
    } else {
        console.log('path to image was null');
        res.sendStatus(500);
    }
});

const getImagePath = (coords, activity) => {
    if (coords && coords.length > 0) {
        if (activity && activity === 'walking') {
            PATH_COLOR = WALKING_PATH_COLOR;
        }
        const firstCoord = coords[0];
        const lastCoord = coords[coords.length - 1];
        const startMarker = `pin-s-a+${PATH_COLOR}(${firstCoord[1]},${firstCoord[0]})`;
        const endMarker = `pin-s-b+${PATH_COLOR}(${lastCoord[1]},${lastCoord[0]})`;
        const pathWithGradient = makePath(coords, activity) + ',' + startMarker + ',' + endMarker;
        const encodedPathWithGradient = encodeURIComponent(pathWithGradient);
        return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${encodedPathWithGradient}/auto/200x200@2x?access_token=${env.mapKey}`;
    }
    return null;
}
const makePath = (coords, activity) => {
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
