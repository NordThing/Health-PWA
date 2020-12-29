export const results = {
    data: function () { 
        return {
            results: [],
            currentPage: 1,
            elementsPerPage: 5
        }
    },
    mounted: function() {
        getResults().then(r => {
            this.$data.results = r;
        });
    },
    unmounted: function() {
    },
    computed: {
    },
    methods: {
        numPages: function() {
            return Math.ceil(this.results.length / this.elementsPerPage);
        },
        getPagedResults: function() {
            const start = (this.currentPage-1) * this.elementsPerPage;
            const end = start + this.elementsPerPage;
            return this.results.slice(start, end);
        },
        changePage: function(page) {
            this.currentPage = page;
        },
        hasMap: function(data) {
            if (hasLocationData(data)) {
                return 'Map';
            }
            return '';
        },
        showMap: function(data, activity) {
            if (hasLocationData(data)) {
                const modal = document.getElementById("myModal");
                const modalImg = document.getElementById("img01");
                const span = document.getElementsByClassName("close")[0];
                getImagePath(data, activity).then((url) => {
                    modal.style.display = "block";
                    modalImg.src = url;
                    span.onclick = function() {
                        modal.style.display = "none";
                    }
                });
            }
        }
    },
    template: `
        <div>
            <div id="resultsTable" class="results-table">
               <table>
                 <thead>
                   <tr>
                     <th>Date</th>
                     <th>Result</th>
                     <th>Activity</th>
                     <th>Distance</th>
                     <th>Location</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr v-for="row in getPagedResults()">
                     <td>{{$filters.formatDate(row.date)}}</td>
                     <td>{{row.result}}</td>
                     <td>{{row.activity}}</td>
                     <td>{{$filters.formatDistance(row.distance)}}</td>
                     <td>
                        <div style="height:100%;width:100%" @click="showMap(row.location, row.activity)">
                            <img id="mapImg" src="" alt="result" style="width:100%;max-width:300px;display:none">
                            {{ hasMap(row.location) }}
                        </div>
                      </td>
                   </tr>
                 </tbody>
              </table>
              <div class="pagination">
                <div class="number"
                     v-for="i in numPages()"
                     v-bind:class="[i == currentPage ? 'active' : '']"
                     v-on:click="changePage(i)">{{i}}
                </div>
              </div>
            </div>
            <div id="myModal" class="map-modal">
              <span class="close">&times;</span>
              <img class="map-modal-content" id="img01">
            </div>
        </div>
    `,
};

const hasLocationData = (data) => {
    return data && data.length > 1;
}

async function getResults() {
    const url = `${window.LifeApp.serverAddr}/results`;
    let response = await fetch(url);
    if (response.ok) {
        const r = await response.json();
        r.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        return r;
    } else {
        return [];
    }
}
