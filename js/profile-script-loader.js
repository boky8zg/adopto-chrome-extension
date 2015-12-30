var ProfileScriptLoader = {
    jsonPath: chrome.extension.getURL('../profile-scripts.json'),
    profileScriptsPath: 'js/profile-scripts/',
    profileScripts: undefined,
    classes: [],

    LoadScripts: function () {
        $.getJSON(this.jsonPath, function (data) {
            ProfileScriptLoader.profileScripts = data;

            $.when.apply($, $.map(ProfileScriptLoader.profileScripts, function (profileScript) {
                return $.ajax({
                    dataType: 'script',
                    url: chrome.extension.getURL(ProfileScriptLoader.profileScriptsPath + profileScript.file)
                }).done(function (data, textStatus, jqxhr) {
                    console.log(data, textStatus, jqxhr);
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