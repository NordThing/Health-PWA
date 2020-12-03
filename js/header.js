const header = Vue.createApp({});
header.component('topbar', {
    template: `
    <!-- HEADER -->
    <header>
        <div class="header">
            <div class="row">
                <div class="column">
                    <div class="header-profile-picture">
                        <i class="material-icons">add_a_photo</i>
                    </div>
                </div>
                <div class="column">
                    <div class="header-app-icon">
                        <i class="material-icons">looks</i>
                    </div>
                </div>
                <div class="column">
                    <div class="header-settings">
                        <i class="material-icons">brightness_medium</i>
                    </div>
                </div>
            </div>
        </div>
    </header>
   `,
});
header.mount('#header');

