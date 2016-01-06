var ps = [
    {
        name: 'Facebook',
        sourceType: 1,
        hosts: ['facebook.com', 'www.facebook.com', 'fb.com', 'www.fb.com'],

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
            if (this.IsProfileMoreInfoActive()) {

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
    },
    {
        name: 'LinkedIn',
        sourceType: 6,
        hosts: ['linkedin.com', 'www.linkedin.com'],

        IsProfilePageActive: function () {
            if ($('.full-name').length) {
                return true;
            }

            return false;
        },

        IsProfileMoreInfoActive: function () {
            return false;
        },

        GetProfilePageUrl: function () {
            return $('.view-public-profile').text();
        },

        GetName: function () {
            return $('.full-name').text();
        },

        GetEmail: function () {
            console.log($('#email-view').text());
            return $('#email-view').text();
        },

        GetJobTitle: function () {
            return $('#headline-container').text();
        },

        GetLocation: function () {
            return '';
        },

        GetProfileImageURL: function () {
            return $('.profile-picture img').attr('src');
        },

        ButtonPlaceholder: function (button) {
        }
    }
]

/* Template:
        name: '',
        sourceType: 0,
        hosts: [],

        IsProfilePageActive: function () {
            return false;
        },

        IsProfileMoreInfoActive: function () {
            return false;
        },

        GetProfilePageUrl: function () {
            return '';
        },

        GetName: function () {
            return '';
        },

        GetEmail: function () {
            return '';
        },

        GetJobTitle: function () {
            return '';
        },

        GetLocation: function () {
            return '';
        },

        GetProfileImageURL: function () {
            return '';
        },

        ButtonPlaceholder: function (button) {
        }
*/