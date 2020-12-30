export const results = {
    data: function () { 
        return {
            results: [],
            currentPage: 1,
            elementsPerPage: 100
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
        getResult: function(result) {
            if (result) {
                return result;
            }
            return '00:00:00';
        },
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
                return 'Show Map';
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
        <div class="results-view">
           <div class="row">
                <div class="column">
                    <div class="card" v-for="row in getPagedResults()">
                        <div class="optional-header">
                            <div class="thumbnail thumbnail--40x40">
                                <img src="images/Portrait_Placeholder.png">
                            </div>
                            <div class="title">
                                {{$filters.formatDate(row.date)}}
                            </div>
                            <div class="subhead">
                                {{$filters.formatDistance(row.distance)}} at {{getResult(row.result)}}
                                <div style="height:100%;width:100%;padding-top:5px" @click="showMap(row.location, row.activity)">
                                    <img id="mapImg" src="" alt="result" style="width:100%;max-width:300px;display:none">
                                    {{ hasMap(row.location) }}
                                </div>
                            </div>
                        </div>
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
