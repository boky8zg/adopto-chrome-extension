var ProfileScriptLoader = {
    jsonPath: '../profile-scripts.json',
    profileScriptsPath: 'profile-scripts/',
    profileScripts: undefined,
    classes: [],

    LoadScripts: function () {
        $.getJSON(this.jsonPath, function (data) {
            ProfileScriptLoader.profileScripts = data;

            $.when.apply($, $.map(ProfileScriptLoader.profileScripts, function (profileScript) {
                return $.getScript(ProfileScriptLoader.profileScriptsPath + profileScript.file).done(function (data) {
                    ProfileScriptLoader.classes[profileScript.class] = ProfileScript;
                });
            })).done(function () {
                // All loaded!
                console.log('Loaded!');
            }).fail(function () {
                console.log('Failed!');
            });
        });
    }
}