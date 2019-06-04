//*************************************
// top menu
// ********************

jQuery(document).ready(function($) {
    //hide/show on scrolling
    var prevScrollpos = window.pageYOffset;
    var mainMenuHeight;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (mainMenuHeight < $(window).outerHeight()) {
            if (prevScrollpos > currentScrollPos) {
                $("#masthead").slideDown(300);
            } else {
                $("#masthead").slideUp(300);
            }
        }
        prevScrollpos = currentScrollPos;
    }

    alignMenu();
    mainMenuHeight = menuHeight();
    $(window).resize(function() {

        $("#masthead").slideDown(1);
        $(".nav-menu").append($(".nav-menu li.hideshow ul").html());
        $(".nav-menu li.hideshow").remove();
        alignMenu();
        mainMenuHeight = menuHeight();
    });

    function menuHeight() {
        let maxHeight = 0;
        jQuery.each($(".hideshow ul"), function() {
            let t = 0;
            if ($(this).css("position") === "absolute") {
                t = $(this).offset().top;
            } else {
                t = $(this).position().top;
            }
            let h = t + $(this).outerHeight(true);
            if (maxHeight < h) {
                maxHeight = h;
            }
        });
        return maxHeight;
    }

    function alignMenu() {
        var widthNavTotal = 0;
        var maxWidth = $(window).outerWidth() - 290;
        var menuhtml = '';
        jQuery.each($(".nav-menu").children(), function() {
            widthNavTotal += $(this).outerWidth(true);
            if (maxWidth < widthNavTotal) {
                menuhtml += $('<div>').append($(this).clone()).html();
                $(this).remove();
            }
        });
        $(".nav-menu").append(
            '<li class="hideshow menu-item">' +
            '<a href="#">' +
            '<i class="fas fa-bars"></i>' +
            '</a><ul class="sub-menu">' + menuhtml + '</ul></li>');
        $(".nav-menu li.hideshow").click(function() {
            $(this).children("ul").toggle();
        });
        if (menuhtml == '') {
            $(".nav-menu li.hideshow").hide();
        } else {
            $(".nav-menu li.hideshow").show();
        }
        if (menuHeight() > $(window).outerHeight()) {
            $("#masthead").css("position", "absolute");
        } else {
            $("#masthead").css("position", "fixed");
        }
    }
});