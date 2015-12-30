var ProfileScript = {
    host: ['facebook.com', 'www.facebook.com', 'fb.com', 'www.fb.com'],

    IsProfilePageActive: function () {
        if ($('#fbCoverImageContainer').length) {
            return true;
        }

        return false;
    },

    IsProfileMoreInfoActive: function () {
        if (window.location.pathname.split('/')[2] == 'about') {
            return true;
        }

        return false;
    },

    GetProfilePageUrl: function () {
        return window.location.origin + '/' + window.location.pathname.split('/')[1] + '/about'
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
        return $('.profilePic').attr('src');
    },

    ButtonPlaceholder: function (button) {
        button.appendTo('.profilePicThumb');
        button.css({
            
        });
    }
}
