var ProfileScriptLoader = {
    jsonPath: 'profile-scripts.json',
    settings: undefined,
    classes: [],

    LoadScripts: function () {
        $.getJSON(this.jsonPath, function (data) {
            this.settings = data;

            for (var setting in this.settings) {
                
            }
        });
    }
}