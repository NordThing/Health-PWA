const saveDialog = Vue.createApp({});
saveDialog.component('saveDialog', {
    methods: {
        save: function() {
            const modal = document.getElementById("saveModal");
            if (modal) {
                const result = modal.getAttribute("result");
                saveResult(result, "Felt good");
            }
        },
        cancel: function() {
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


async function saveResult(result, comment) {
    const url = "http://localhost:3001/result";
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ result: result, comment: comment })
    });
    if (response.ok) {
        close();
        window.location.reload(true);
    }
}

