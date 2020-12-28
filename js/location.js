let MAP_BOX_API_KEY = ''; //
const PATH_COLOR = '3CB371';

async function getImagePath(coordsArgs) {
        const url = "http://localhost:3001/keys";
        let response = await fetch(url, {
            method: 'GET',
        });
        if (response.ok) {
            const result = await response.json();
            MAP_BOX_API_KEY = result.mapKey;
            const coords = coordsArgs ? coordsArgs : getTestCoords();
            const firstCoord = coords[0];
            const lastCoord = coords[coords.length - 1];
            const startMarker = `pin-s-a+${PATH_COLOR}(${firstCoord[1]},${firstCoord[0]})`;
            const endMarker = `pin-s-b+${PATH_COLOR}(${lastCoord[1]},${lastCoord[0]})`;
            const pathWithGradient = makePath(coords) + ',' + startMarker + ',' + endMarker;
            const imageURL = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${encodeURIComponent(pathWithGradient)}/auto/200x200@2x?access_token=${MAP_BOX_API_KEY}`;
            return imageURL;
        }
}

const getPositionObj = (position) => {
    const location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    }
    return location;
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

const getTestCoords = (startLocation) => {
    const c = [];
    if (startLocation) {
        c.push(startLocation.longitude, startLocation.latitude);
    }
    c.push([ 60.61938149999999, 15.623557300000002]);
    c.push([60.62009563905444, 15.62344285776121]);
    c.push([60.61991464203454, 15.623037757870916]);
    c.push([60.61975493793828, 15.622639891907232]);
    c.push([60.619055, 15.623339]);
    c.push([60.61876284451728, 15.623607219690602]);
    c.push([60.61879969084829, 15.623878122784708]);
    c.push([60.61894444388411, 15.624248267606355]);
    c.push([60.619034485186845, 15.624455607486949]);
    c.push([60.619062877718065, 15.62440497000066]);
    c.push([60.619137407993584, 15.624267525395025]);
    c.push([60.61925452665013, 15.624072209376491]);
    c.push([60.619339703587784, 15.623941998697468]);
    return c;
}

// export {
    // locationTracker
// }
