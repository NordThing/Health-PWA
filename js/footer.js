const footer = Vue.createApp({});
footer.component('bottombar', {
    template: `
    <!-- FOOTER -->
    <footer>
        <div class="footer">    
            <div class="row">
                <div class="column">
                    <div class="footer-overview">
                        <i class="material-icons">dvr</i>
                    </div>
                </div>
                <div class="column">
                    <div class="footer-calendar">
                        <i class="material-icons">calendar_today</i>
                    </div>
                </div>
                <div class="column">
                    <div class="footer-activity">
                        <i class="material-icons">timer</i>
                    </div>
                </div>
                <div class="column">
                    <div class="footer-weight">
                        <i class="material-icons">addchart</i> </div>
                </div>
            </div>
        </div>    
    </footer>
   `,
});
footer.mount('#footer');



