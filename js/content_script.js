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
    GetProfilePic();    /* For test */

    $('.adopto-sidebar .btn-close').bind('click', function () {
        HideSidebar();
        console.log('Test');
    });

    $('#adopto-form').bind('submit', function (e) {
        alert('123123123');

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
    GetProfilePic();    /* For test */
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