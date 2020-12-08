const resultsView = Vue.createApp({});
resultsView.component('results', {
    data: function () { 
        return {
            results: []
        }
    },
    mounted: function() {
        getResults().then(r => {
            this.$data.results = r;
        });
    },
    unmounted: function() {
        console.log("unmounted");
    },
    computed: {
    },
    methods: {
    },
    template: `
        <ul id="training-results" style="padding-top: 50px">
          <li v-for="(item) in results">
            Result: {{ item.result }},
            Date: {{ item.date }},
            Comment: {{ item.comment }},
            Location: {{ item.location || 'No data' }}
          </li>
        </ul>
    `,
});

async function getResults() {
    const url = "http://localhost:3001/results";
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        return [];
    }
}

resultsView.mount('#results');
