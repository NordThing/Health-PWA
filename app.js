// import { header } from './js/header.js';
import { timer } from './js/timer.js';
import { results } from './js/results.js';
// import { saveDialog } from './js/saveDialog.js';
// import { footer } from './js/footer.js';

// The App
const app = Vue.createApp({});

// Components
// app.component('top-bar', header);
app.component('timer', timer);
app.component('results', results);
// app.component('save-dialog', saveDialog);
// app.component('bottom-bar', footer);

// Filters
app.config.globalProperties.$filters = {
    formatDate(value) {
        if (value) {
            const tuple = value.split("T");
            // date
            const date = tuple[0];
            const dateTuple = date.split("-");
            const day = parseInt(dateTuple[2]);
            const month = parseInt(dateTuple[1]);
            const year = parseInt(dateTuple[0]);
            const newFormatedDate = [ day, month, year ].join("/");
            // time
            const time = tuple[1].split('.');
            return `${newFormatedDate} ${time[0]}`;
        }
        return '';
    },
    formatDistance(value) {
        if (value) {
            const distance = value.split('km');
            if (distance.length === 2) {
                return `${Math.round((parseFloat(distance[0]) + Number.EPSILON) * 100) / 100} km`;

            }
        }
        return '0 km';

    }
};

app.mount('#container');

setTheme();
addButtonThemeListener();
