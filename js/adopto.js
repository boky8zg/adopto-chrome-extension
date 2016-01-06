/* Html pages */
var pluginHtml = {
    loading: {
        url: 'html/loading.html',
        data: ''
    },
    sidebar: {
        url: 'html/sidebar.html',
        data: ''
    },
    notLogged: {
        url: 'html/not-logged.html',
        data: ''
    },
    openProfile: {
        url: 'html/open-profile.html',
        data: ''
    }
};

/* Load html pages */
$.when.apply($, $.map(pluginHtml, function (html) {
    return $.get(chrome.extension.getURL(html.url), function (data) {
        html.data = data;
    });
})).done(function () {
    RenderLoading();
});

/* Job list and talent list */
var userData;

/* Get job and talent list */
GetUserData();

/* Render sidebar div */
$('body').append('<div class="adopto-sidebar"></div>');

/* Get job and talent list */
function GetUserData(onLoad) {
    $.getJSON('https://adopto.eu/Browser/GetCodeData', function (data) {
        userData = data;

        if (onLoad != undefined) {
            onLoad();
        }
    });
}

/* Show/Hide sidebar */
function ToggleSidebar() {
    if ($('.adopto-sidebar').css('right') == '0px') {
        HideSidebar();
    } else {
        ShowSidebar();
    }
}

/* Show sidebar */
function ShowSidebar() {
    console.log('ShowSidebar');
    var id = DetectScript();
    
    if (id > -1) {
        $('.adopto-sidebar').animate({
            'right': 0
        });

        GetUserData(function () {
            if (userData.IsAuthenticated && userData.RecruiterAccount) {
                if (ps[id].IsProfilePageActive()) {
                    RenderSidebar(id);
                } else {
                    RenderOpenProfile();
                }
            } else {
                RenderNotLogged();
            }
        });
    }
}

/* Hide sidebar */
function HideSidebar() {
    $('.adopto-sidebar').animate({
        'right': -350
    }, {
        complete: function () {
            RenderLoading();
        }
    });
}

function RenderLoading() {
    $('.adopto-sidebar').html(pluginHtml.loading.data);
}

function RenderSidebar(id) {
    $('.adopto-sidebar').html(pluginHtml.sidebar.data);

    /* Set source type */
    $('.adopto-sidebar #adopto-SourceType').val(ps[id].sourceType);

    /* Set profile url */
    $('.adopto-sidebar #adopto-SourceProfileUrl').val(ps[id].GetProfilePageUrl());

    /* Set profile picture url */
    $('.adopto-sidebar #adopto-SourceProfileImageUrl').val(ps[id].GetProfileImageURL());

    /* Render profile picture */
    $('.adopto-sidebar .candidate-image').attr('src', ps[id].GetProfileImageURL());

    /* Render name */
    $('.adopto-sidebar #adopto-Name').val(ps[id].GetName());

    /* Render email */
    $('.adopto-sidebar #adopto-Email').val(ps[id].GetEmail());

    /* Render job title */
    $('.adopto-sidebar #adopto-JobTitle').val(ps[id].GetJobTitle());

    /* Render location */
    $('.adopto-sidebar #adopto-Location').val(ps[id].GetLocation());

    /* Render job list */
    for (var i = 0; i < userData.Jobs.length; i++) {
        $('.adopto-sidebar #JobId').append('<option value="' + userData.Jobs[i].Id + '">' + userData.Jobs[i].Text + '</option>');
    }

    /* Render talent list */
    for (var i = 0; i < userData.TalentList.length; i++) {
        $('.adopto-sidebar #TalentListId').append('<option value="' + userData.TalentList[i].Id + '">' + userData.TalentList[i].Text + '</option>');
    }
}

function RenderOpenProfile() {
    $('.adopto-sidebar').html(pluginHtml.openProfile.data);
}

function RenderNotLogged() {
    $('.adopto-sidebar').html(pluginHtml.notLogged.data);
}

/* Detect content script by host name */
function DetectScript() {
    for (var i = 0; i < ps.length; i++) {
        for (var j = 0; j < ps[i].hosts.length; j++) {
            if (ps[i].hosts[j] == window.location.hostname) {
                return i;
            }
        }
    }

    return -1;
}

/* Button actions */
$('.adopto-sidebar').on('click', '.btn-close', function () {
    HideSidebar();
});

$('#adopto-form').on('click', '#adopto-submit', function (e) {
    var formData = $('.adopto-sidebar #adopto-form').serialize();

    $.post(
        'https://adopto.eu/Browser/Save',
        formData
    );

    e.preventDefault();
    return false;
});

// Old:
/*
if ($('.adopto-sidebar').length) {
    if ($('.adopto-sidebar').css('right') == '0px') {
        HideSidebar();
    } else {
        ShowSidebar();
    }
} else {
    RenderSidebar();
    ShowSidebar();
}

function AfterSidebarRender() {
    GetProfilePic();

    $('.adopto-sidebar .btn-close').bind('click', function () {
        HideSidebar();
        console.log('Test');
    });

    $('#adopto-form').bind('submit', function (e) {
        var formData = $('.adopto-sidebar #adopto-form').serialize();

        $.post(
            'https://adopto.eu/Browser/Save',
            formData
        );

        e.preventDefault();
        return false;
    });
}

function GetLists() {
    $.getJSON('https://adopto.eu/Browser/GetCodeData', function (data) {
        for (var i = 0; i < data.Jobs.length; i++) {
            $('.adopto-sidebar #JobId').append('<option value="' + data.Jobs[i].Id + '">' + data.Jobs[i].Text + '</option>');
        }

        for (var i = 0; i < data.TalentList.length; i++) {
            $('.adopto-sidebar #TalentListId').append('<option value="' + data.TalentList[i].Id + '">' + data.TalentList[i].Text + '</option>');
        }
    });
}

function RenderSidebar() {
    if (!$('.adopto-sidebar').length) {
        $('body').append('<div class="adopto-sidebar"></div>');
    }

    $.get('https://adopto.eu/Browser/GetCodeData', function (data) {
        if (data.IsAuthenticated && data.RecruiterAccount) {
            var SidebarURL = chrome.extension.getURL('html/sidebar.html');
        } else {
            var SidebarURL = chrome.extension.getURL('html/not-logged.html');
        }

        $('.adopto-sidebar').load(SidebarURL, function () {
            AfterSidebarRender();
            GetLists();
        });
    });
}

function ShowSidebar() {
    GetProfilePic();
    $('.adopto-sidebar').animate({
        'right': 0
    });
}

function HideSidebar() {
    $('.adopto-sidebar').animate({
        'right': -350
    });
}

function GetProfilePic() {
    var ProfilePicURL = $('.profilePic').attr('src');
    $('.adopto-sidebar .candidate-image').attr('src', ProfilePicURL);

    var ProfileName = $('#fb-timeline-cover-name').html();
    $('.adopto-sidebar #adopto-Name').val(ProfileName);

}
*/
