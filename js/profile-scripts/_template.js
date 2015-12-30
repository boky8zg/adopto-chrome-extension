var _template = {
    host: [], /* Ako se host name poklapa s hostom aktivnog taba u broswseru, onda je ovo ciljani modul */

    /* Gleda jesmo li na profilu nekoga korisnika */
    IsProfilePageActive: function () {
        if (true) {
            return true;
        }

        return false;
    },

    /* Dobavljanje url-a profila korisnika (ukoliko IsProfilePageActive daje true) */
    GetProfilePageUrl: function () {
        return 'https://'
    },

    /* Dobavljanje imena korisnika (ukoliko IsProfilePageActive daje true) */
    GetName: function () {
        return '';
    },

    /* Dobavljanje email-a korisnika (ukoliko IsProfilePageActive daje true) */
    GetEmail: function () {
        return '';
    },

    /* Dobavljanje zanimanja korisnika (ukoliko IsProfilePageActive daje true) */
    GetJobTitle: function () {
        return '';
    },

    /* Dobavljanje lokacije korisnika (ukoliko IsProfilePageActive daje true) */
    GetLocation: function () {
        return '';
    },

    /* Dobavljanje slike profila korisnika (ukoliko IsProfilePageActive daje true) */
    GetProfileImageURL: function () {
        return '';
    },

    /* Button za otvaranje sidebara (ukoliko IsProfilePageActive daje true) */
    ButtonPlaceholder: function (button) {
        
    }
}