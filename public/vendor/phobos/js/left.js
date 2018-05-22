
window.utils = {
    isFirefox: function () {
        return navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    },
    animation_ends: function () {
        return "animationend webkitAnimationEnd oAnimationEnd"
    },
    isTablet: function () {
        return $(".sidebar-flat").width() < 100
    },
    get_timestamp: function (t) {
        return moment().subtract("days", t).toDate().getTime()
    }
}


var Sidebar = {
    position: function (str, m, i) {
        return str.split(m, i).join(m).length;


    },
    initialize: function () {
        var t = $(".sidebar-flat"),
                e = t.find(".current-user .menu");


        $(".current-user .name").click(function (t) {
            t.preventDefault(), t.stopPropagation(), e.toggleClass("active")
        }), e.click(function (t) {
            t.stopPropagation()
        }), $("body").click(function () {
            e.removeClass("active")
        });


        var n = t.find("[data-toggle~='sidebar']");
        n.click(function (t) {
            if (t.preventDefault(), !utils.isTablet()) {
                $(this).closest(".submenu").length || n.not(this).removeClass("toggled").siblings(".submenu").slideUp(300, o);
                var e = $(this),
                        i = $(this).siblings(".submenu");
                e.toggleClass("toggled"), e.hasClass("toggled") ? i.slideDown(300, o) : i.slideUp(300, o)
            }
        });


        var i = window.location.pathname;
        var u = i.substr(0, Sidebar.position(i, '/', 3));
        
        t.find(".menu-section a").removeClass("active");
        var s = t.find("a[href='" + i + "']");

        if (s.length) {
            if (s.addClass("active"), s.parents(".submenu").length) {
                var r = s.closest(".option").find("[data-toggle~='sidebar']");
                r.addClass("active toggled");
                s.parents(".submenu").addClass("active");
            }
        } else
            t.find(".menu-section li > a:eq(0)").addClass("active");


        /**/


        var o = function () {
            var t = $("body").height();
            $(".sidebar-flat").css("bottom", "auto");
            var e = $(".sidebar-flat").height();
            t > e ? $(".sidebar-flat").css("bottom", 0) : $(".sidebar-flat").css("bottom", "auto")
        },
                a = $("#content .sidebar-toggler");
        a.click(function (t) {
            t.stopPropagation(), $("body").toggleClass("open-sidebar")
        }), $("#content").click(function () {
            $("body").removeClass("open-sidebar")
        });
    }
};


$(function () {
    Sidebar.initialize();

    var alto = $('.sidebar-flat').height() - 180;
    $('.section-container').height(alto);

    $(window).resize(function () {
        var alto = $('.sidebar-flat').height() - 180;
        $('.section-container').height(alto);
    });

});

