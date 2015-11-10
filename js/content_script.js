if ($('#adopto-extension-sidebar').length) {
    if ($('#adopto-extension-sidebar').css('right') == '0px') {
        HideSidebar();
    } else {
        ShowSidebar();
    }
} else {
    RenderSidebar();
    ShowSidebar();
}

function RenderSidebar() {
    var SidebarURL = chrome.extension.getURL('html/sidebar.html');
    $('body').append('<div id="adopto-extension-sidebar"></div>');
    $('#adopto-extension-sidebar').load(SidebarURL, function () {
        GetProfilePic();    /* For test */
    });
}

function ShowSidebar() {
    GetProfilePic();    /* For test */
    $('#adopto-extension-sidebar').animate({
        'right': 0
    });
}

function HideSidebar() {
    $('#adopto-extension-sidebar').animate({
        'right': -400
    });
}

function GetProfilePic() {
    var ProfilePicURL = $('.profilePic').attr('src');
    console.log('url("' + ProfilePicURL + '")');
    $('#profile-picture').css('background-image', 'url("' + ProfilePicURL + '")');
}