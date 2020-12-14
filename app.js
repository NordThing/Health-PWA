import { header } from './js/header.js';
import { timer } from './js/timer.js';
import { results } from './js/results.js';
import { saveDialog } from './js/saveDialog.js';
import { locationTracker } from './js/location.js';
import { footer } from './js/footer.js';

const app = Vue.createApp({});

app.component('top-bar', header);
app.component('timer', timer);
app.component('results', results);
app.component('location-tracker', locationTracker);
app.component('save-dialog', saveDialog);
app.component('bottom-bar', footer);

app.mount('#container');

