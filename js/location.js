const MAP_BOX_API_KEY = 'pk.eyJ1Ijoic3BsdXNrIiwiYSI6ImNraW5wNGw1bDEzaXEzMnA5aXAxdDBoejkifQ.cOQX7RDu3T8QNLf8TapXCA';
const PATH_COLOR = '3CB371';

export const locationTraker = {
    data: function () { 
        return {
            currentPosition: null,
            startLocation: null,
            endLocation: null,
            recordedPositions: [],
            img_url: ""
        };
    },
    mounted: function() {
        if(navigator.geolocation) {
            this.getPath();
        } else {
            console.log("Geo Location not supported by browser");
        }
    },
    unmounted: function() {
    },
    computed: {
    },
    methods: {
        getPath: function() {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = getPositionObj(position);
                this.$data.currentPosition = pos;
                this.$data.startLocation = pos;
                const coords = getLocalCords(pos);
                const firstCoord = coords[0];
                const lastCoord = coords[coords.length - 1];
                const startMarker = `pin-s-a+${PATH_COLOR}(${firstCoord[1]},${firstCoord[0]})`;
                const endMarker = `pin-s-b+${PATH_COLOR}(${lastCoord[1]},${lastCoord[0]})`;
                const pathWithGradient = makePath(coords) + ',' + startMarker + ',' + endMarker;
                this.$data.img_url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${encodeURIComponent(pathWithGradient)}/auto/200x200@2x?access_token=${MAP_BOX_API_KEY}`;
            });
        }
    },
    template: `<img v-bind:src='img_url' >`,
};

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

const getLocalCords = (startPosition) => {
    const c = [];
    c.push([startPosition.latitude, startPosition.longitude]);
    c.push([startPosition.latitude, startPosition.longitude]);
    // c.push([60.62009563905444, 15.62344285776121]);
    // c.push([60.61991464203454, 15.623037757870916]);
    // c.push([60.61975493793828, 15.622639891907232]);
    // c.push([60.619055, 15.623339]);
    // c.push([60.61876284451728, 15.623607219690602]);
    // c.push([60.61879969084829, 15.623878122784708]);
    // c.push([60.61894444388411, 15.624248267606355]);
    // c.push([60.619034485186845, 15.624455607486949]);
    // c.push([60.619062877718065, 15.62440497000066]);
    // c.push([60.619137407993584, 15.624267525395025]);
    // c.push([60.61925452665013, 15.624072209376491]);
    // c.push([60.619339703587784, 15.623941998697468]);

    return c;
}
