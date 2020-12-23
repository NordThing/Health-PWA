const saveDialog = {
    methods: {
        save: function() {
            saveResult();
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
                    <h6>Save activity?</h6>
                    <p>Do you want to save this session?</p>
                    <div class="modal-saveButtons">
                        <button onclick="closeSaveDialog()">NO</button>
                        <button onclick="saveResult()">YES</button>
                    </div>
            </div>
       `,
};

function closeSaveDialog() {
    var mainCont = document.getElementById("main");
    var modal = document.getElementById("saveModal");
    modal.style.display = "none";
    mainCont.classList.remove("main-blur");
    sessionStorage.removeItem('location');
    sessionStorage.removeItem('distance');
};

async function saveResult() {
    const modal = document.getElementById("saveModal");
    if (modal) {
        const result = modal.getAttribute("result");
        let location = sessionStorage.getItem('location');
        const distance = sessionStorage.getItem('distance');
        if (location) {
            location = JSON.parse(location);
        } else {
            location = [];
        }
        const url = "http://localhost:3001/result";
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ result: result, comment: '', location: location, distance: distance })
        });
        if (response.ok) {
            closeSaveDialog();
            window.location.reload(true);
        }
    }
}
// export {
    // closeSaveDialog,
    // saveResult,
    // saveDialog
// };
