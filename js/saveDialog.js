const saveDialog = Vue.createApp({});
saveDialog.component('saveDialog', {
    methods: {
        save: function() {
            console.log("saving data to DB");
            close();
        },
        cancel: function() {
            console.log("do nothing");
            close();
        },
    },
    template: `
            <!-- The Save Modal -->
            <div id="saveModal" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <p>Do you want to save this session?</p>
                    <button @click="save">YES &nbsp;</button>
                    <button @click="cancel">NO</button>
                </div>
            </div>
       `,
});
saveDialog.mount('#saveDialog');

const close = () => {
    var mainCont = document.getElementById("main");
    var modal = document.getElementById("saveModal");
    modal.style.display = "none";
    mainCont.classList.remove("main-blur");
};

