let wakeLock = null;
let watchId = null;

// Public
function startLocationRecording() {
    if(navigator.geolocation) {
        const options = {
            maximumAge: 1000,
            timeout: 5000,
            enableHighAccuracy : true,
        };
        const onSuccess = (position) => {
            let locationData = sessionStorage.getItem('location');
            if (locationData) {
                locationData = JSON.parse(locationData);
            } else {
                locationData = [];
            }
            locationData.push([position.coords.latitude, position.coords.longitude]);
            sessionStorage.setItem('location', JSON.stringify(locationData));
            sessionStorage.setItem('distance', getDistanceFromCoords(locationData));
        };
        const onError = (error) => {
            console.log(`Location error occured due to error code: ${error.code}`);
        }
        if ('wakeLock' in navigator) {
            requestWakeLock();    
        }
        watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
    }
}

function stopLocationRecording() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
    }
    if (wakeLock !== null) {
        wakeLock.release();
    }

}

async function getImagePath(coords) {
    const url = `${window.LifeApp.serverAddr}/locationMap`;
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ coords: coords })
    });
    if (response.ok) {
        const result = await response.blob();
        return URL.createObjectURL(result);
    }
    return '';
}

// Private
const getDistanceFromCoords = (coords) => {
    let distance = "";
    if (coords.length > 1) {
        const options = { units: 'kilometers' };
        let d = 0;
        const nrOfCoords = coords.length;
        for(let i = 0; i < nrOfCoords - 1; i++) {
            d += turf.distance(coords[i], coords[i+1], options);
        }
        distance = `${d} km`;
        console.log("You travelled: " + distance);
    }
    return distance;
}

const requestWakeLock = async () => {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
            console.log('Screen Wake Lock released:', wakeLock.released);
            wakeLock = null;
        });
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
};
