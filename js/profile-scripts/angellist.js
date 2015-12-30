var ProfileScript = {
    host: [],

    IsProfilePageActive: function () {
        

        return false;
    },

    IsProfileMoreInfoActive: function () {
        if (window.location.pathname.split('/')[2] == 'about') {
            return true;
        }

        return false;
    },

    GetProfilePageUrl: function () {
        return window.localStorage.pathname.split('/')[1];
    },

    GetName: function () {
        return $('#fb-timeline-cover-name').html();
    },

    GetEmail: function () {
        if (IsProfileMoreInfoActive()) {

        }

        return '';
    },

    GetJobTitle: function () {

        return '';
    },

    GetLocation: function () {

        return '';
    },

    GetProfileImageURL: function () {
        
    },

    ButtonPlaceholder: function (button) {
        
    }
}
