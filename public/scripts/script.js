(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var scrolling = false;

var previousScroll = 0;

//smooth scrolling

$('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 900, 'swing');
});

var app = {};

// scroll event 
app.scrollingEvent = function () {
    $(window).scroll(function () {
        scrolling = true;
    });
};

app.scrollUpNav = function () {

    var headerTop = $("header").offset().top;
    var headerBottom = $("header").offset().top + $("header").outerHeight();
    var screenBottom = $(window).scrollTop() + window.innerHeight;
    var screenTop = $(window).scrollTop();

    var currentScroll = $(window).scrollTop();

    //scrolling up 
    if (currentScroll < previousScroll) {
        //and header is in view
        if (screenBottom > headerTop && screenTop < headerBottom) {
            $('.logo').removeClass('navGone');
            $('.headerList').removeClass('navGone');
            $('.navLink').removeClass('navLinkScrollUp');
            $('.headerNav').removeClass('navGone navOverlay');
            $('.overlayButton').removeClass('navButtonBlack');
            $('.overlayButton').removeClass('navGone');
        }

        // header is not in view
        else {
                $('.navLink').addClass('navLinkScrollUp');
                $('.headerList').removeClass('navGone');
                $('.headerNav').removeClass('navGone').addClass('navOverlay');
                $('.test').addClass('testShow');
                $('.overlayButton').addClass('navButtonBlack');
                $('.overlayButton').removeClass('navGone');
            }
    }

    //scrolling down
    if (currentScroll > previousScroll) {
        // header is in view
        if (screenBottom > headerTop && screenTop < headerBottom) {
            // $('.logo').addClass('navGone');
            $('.headerList').addClass('navGone');
        }

        // header is not in view
        else {
                $('.logo').addClass('navGone');
                $('.navLink').removeClass('navLinkScrollUp');
                $('.headerList').addClass('navGone');
                $('.headerNav').addClass('navGone');
                $('.overlayButton').addClass('navGone');
            } // end of else header is not in view
    } // end of scrolling down

    previousScroll = currentScroll;
};

app.scrollEffects = function () {
    setInterval(function () {
        if (scrolling = true) {
            scrolling = false;
            // app.appearOnScroll();
            app.scrollUpNav();
        } // end of if scrolling
    }, 250); // end of interval
};

// making 'move laugh play' animated
app.headerTextEffect = function () {
    setTimeout(function () {
        $('.move').addClass('headerTextEffect');
    }, 200);
    setTimeout(function () {
        $('.laugh').addClass('headerTextEffect');
    }, 300);
    setTimeout(function () {
        $('.play').addClass('headerTextEffect');
    }, 400);
};

// to view different team members 
app.viewTeam = function () {
    $('.teamImage').on('click', function (e) {
        e.preventDefault();
        $('.showTeam').addClass('fade');
        setTimeout(function () {
            $('.showTeam').removeClass('showTeam');
        }, 200);

        // hide overlay on selected item
        $('.hideOverlay').removeClass('hideOverlay');

        var removeOverlay = $(this).find('.imageOverlay');
        $(removeOverlay).addClass('hideOverlay');

        // show the bio of the selected person
        var clickedPerson = $(this).data('src');

        var openProfile = $('.aboutContent').find('.aboutBlock');

        $.each(openProfile, function (index, value) {

            var name = $(value).attr('data-src');

            if (clickedPerson === name) {
                $(value).addClass('fade');
                setTimeout(function () {
                    $(value).addClass('showTeam').removeClass('fade');
                    $('html, body').animate({
                        scrollTop: $('.showTeam').offset().top
                    }, 600, 'swing');
                }, 200);
            } // end of ternary operator 
        }); // end of loop
    }); // end of event
};

app.navButton = function () {
    $('.overlayButton').on('click', function (e) {
        e.preventDefault();

        var overlayShowing = $('.mobileNav').hasClass('mobileNavShow');

        // if the nav isn't opened yet
        if (!overlayShowing) {
            $('.mobileNav').addClass('mobileNavShow');
            $('.overlayButton').addClass('closeNavOverlay');

            //if nav is opened
        } else {
            $('.mobileNav').removeClass('mobileNavShow');
            $('.overlayButton').removeClass('closeNavOverlay');
        } // end of if
    }); // end of event
};

app.navAction = function () {
    $('.navLinkMobile').on('click', function () {
        $('.mobileNav').removeClass('mobileNavShow');
        $('.overlayButton').removeClass('closeNavOverlay');
    });
};

// check if the device is a touch device, and add classes to the hover elements if it is not a touch device
app.addHover = function () {

    // check if browser doesnt' support touch
    var touchsupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    if (!touchsupport) {
        // browser doesn't support touch
        $('.teamImage').addClass('teamImageHover');
    }
};

// instaToken: '18895804.c0ad8de.68321fded22d4c52ad65fe3c43dd1cc1',
// instaID: 'c0ad8deb97c14b5e94a3ececcff05af4',


app.init = function () {
    app.scrollingEvent();
    app.headerTextEffect();
    app.scrollEffects();
    app.viewTeam();
    app.navButton();
    app.navAction();
    app.addHover();
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLElBQUksWUFBWSxLQUFoQjs7QUFFQSxJQUFJLGlCQUFpQixDQUFyQjs7QUFFQTs7QUFFQSxFQUFFLGNBQUYsRUFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBVSxDQUFWLEVBQWE7QUFDdkMsTUFBRSxjQUFGO0FBQ0EsTUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3BCLG1CQUFXLEVBQUUsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBRixFQUF3QixNQUF4QixHQUFpQztBQUR4QixLQUF4QixFQUVHLEdBRkgsRUFFUSxPQUZSO0FBR0gsQ0FMRDs7QUFPQSxJQUFNLE1BQU0sRUFBWjs7QUFHQTtBQUNBLElBQUksY0FBSixHQUFxQixZQUFNO0FBQ3ZCLE1BQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBWTtBQUN6QixvQkFBWSxJQUFaO0FBRUgsS0FIRDtBQUlILENBTEQ7O0FBT0EsSUFBSSxXQUFKLEdBQWtCLFlBQVk7O0FBRTFCLFFBQUksWUFBWSxFQUFFLFFBQUYsRUFBWSxNQUFaLEdBQXFCLEdBQXJDO0FBQ0EsUUFBSSxlQUFlLEVBQUUsUUFBRixFQUFZLE1BQVosR0FBcUIsR0FBckIsR0FBMkIsRUFBRSxRQUFGLEVBQVksV0FBWixFQUE5QztBQUNBLFFBQUksZUFBZSxFQUFFLE1BQUYsRUFBVSxTQUFWLEtBQXdCLE9BQU8sV0FBbEQ7QUFDQSxRQUFJLFlBQVksRUFBRSxNQUFGLEVBQVUsU0FBVixFQUFoQjs7QUFFQSxRQUFJLGdCQUFnQixFQUFFLE1BQUYsRUFBVSxTQUFWLEVBQXBCOztBQUVBO0FBQ0EsUUFBSSxnQkFBZ0IsY0FBcEIsRUFBb0M7QUFDaEM7QUFDQSxZQUFJLGVBQWUsU0FBZixJQUE0QixZQUFZLFlBQTVDLEVBQTBEO0FBQ3RE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aEJELEVBRGtCLENBaUJoQjtBQUNMLENBbEJEOztBQW9CQSxJQUFJLFNBQUosR0FBZ0IsWUFBTTtBQUNsQixNQUFFLGdCQUFGLEVBQW9CLEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDLFlBQVU7QUFDdEMsVUFBRSxZQUFGLEVBQWdCLFdBQWhCLENBQTRCLGVBQTVCO0FBQ0EsVUFBRSxnQkFBRixFQUFvQixXQUFwQixDQUFnQyxpQkFBaEM7QUFDSCxLQUhEO0FBSUgsQ0FMRDs7QUFPQTtBQUNBLElBQUksUUFBSixHQUFlLFlBQU07O0FBRWpCO0FBQ0EsUUFBSSxlQUFnQixrQkFBa0IsTUFBbkIsSUFBK0IsVUFBVSxjQUFWLEdBQTJCLENBQTFELElBQWlFLFVBQVUsZ0JBQVYsR0FBNkIsQ0FBakg7O0FBR0EsUUFBSSxDQUFDLFlBQUwsRUFBbUI7QUFBRTtBQUNqQixVQUFFLFlBQUYsRUFBZ0IsUUFBaEIsQ0FBeUIsZ0JBQXpCO0FBRUg7QUFDSixDQVZEOztBQWNBO0FBQ0k7OztBQUdKLElBQUksSUFBSixHQUFXLFlBQU07QUFDYixRQUFJLGNBQUo7QUFDQSxRQUFJLGdCQUFKO0FBQ0EsUUFBSSxhQUFKO0FBQ0EsUUFBSSxRQUFKO0FBQ0EsUUFBSSxTQUFKO0FBQ0EsUUFBSSxTQUFKO0FBQ0EsUUFBSSxRQUFKO0FBQ0gsQ0FSRDs7QUFVQSxFQUFFLFlBQVU7QUFDUixRQUFJLElBQUo7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5sZXQgc2Nyb2xsaW5nID0gZmFsc2U7XG5cbmxldCBwcmV2aW91c1Njcm9sbCA9IDA7XG5cbi8vc21vb3RoIHNjcm9sbGluZ1xuXG4kKCdhW2hyZWYqPVwiI1wiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKCQodGhpcykuYXR0cignaHJlZicpKS5vZmZzZXQoKS50b3BcbiAgICB9LCA5MDAsICdzd2luZycpO1xufSk7XG5cbmNvbnN0IGFwcCA9IHt9XG5cblxuLy8gc2Nyb2xsIGV2ZW50IFxuYXBwLnNjcm9sbGluZ0V2ZW50ID0gKCkgPT4ge1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICBzY3JvbGxpbmcgPSB0cnVlO1xuXG4gICAgfSlcbn1cblxuYXBwLnNjcm9sbFVwTmF2ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IGhlYWRlclRvcCA9ICQoXCJoZWFkZXJcIikub2Zmc2V0KCkudG9wO1xuICAgIGxldCBoZWFkZXJCb3R0b20gPSAkKFwiaGVhZGVyXCIpLm9mZnNldCgpLnRvcCArICQoXCJoZWFkZXJcIikub3V0ZXJIZWlnaHQoKTtcbiAgICBsZXQgc2NyZWVuQm90dG9tID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGxldCBzY3JlZW5Ub3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICBsZXQgY3VycmVudFNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgIC8vc2Nyb2xsaW5nIHVwIFxuICAgIGlmIChjdXJyZW50U2Nyb2xsIDwgcHJldmlvdXNTY3JvbGwpIHtcbiAgICAgICAgLy9hbmQgaGVhZGVyIGlzIGluIHZpZXdcbiAgICAgICAgaWYgKHNjcmVlbkJvdHRvbSA+IGhlYWRlclRvcCAmJiBzY3JlZW5Ub3AgPCBoZWFkZXJCb3R0b20pIHtcbiAgICAgICAgICAgICQoJy5sb2dvJykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5uYXZMaW5rJykucmVtb3ZlQ2xhc3MoJ25hdkxpbmtTY3JvbGxVcCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlck5hdicpLnJlbW92ZUNsYXNzKCduYXZHb25lIG5hdk92ZXJsYXknKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykucmVtb3ZlQ2xhc3MoJ25hdkJ1dHRvbkJsYWNrJyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoZWFkZXIgaXMgbm90IGluIHZpZXdcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcubmF2TGluaycpLmFkZENsYXNzKCduYXZMaW5rU2Nyb2xsVXAnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJOYXYnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbmF2R29uZScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCduYXZPdmVybGF5Jyk7XG4gICAgICAgICAgICAkKCcudGVzdCcpLmFkZENsYXNzKCd0ZXN0U2hvdycpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5hZGRDbGFzcygnbmF2QnV0dG9uQmxhY2snKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vc2Nyb2xsaW5nIGRvd25cbiAgICBpZiAoY3VycmVudFNjcm9sbCA+IHByZXZpb3VzU2Nyb2xsKSB7XG4gICAgICAgIC8vIGhlYWRlciBpcyBpbiB2aWV3XG4gICAgICAgIGlmICgoc2NyZWVuQm90dG9tID4gaGVhZGVyVG9wKSAmJiAoc2NyZWVuVG9wIDwgaGVhZGVyQm90dG9tKSkge1xuICAgICAgICAgICAgLy8gJCgnLmxvZ28nKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAvLyBoZWFkZXIgaXMgbm90IGluIHZpZXdcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcubG9nbycpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcubmF2TGluaycpLnJlbW92ZUNsYXNzKCduYXZMaW5rU2Nyb2xsVXAnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJOYXYnKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICB9Ly8gZW5kIG9mIGVsc2UgaGVhZGVyIGlzIG5vdCBpbiB2aWV3XG4gICAgfSAvLyBlbmQgb2Ygc2Nyb2xsaW5nIGRvd25cblxuICAgIHByZXZpb3VzU2Nyb2xsID0gY3VycmVudFNjcm9sbDtcblxufVxuXG5hcHAuc2Nyb2xsRWZmZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzY3JvbGxpbmcgPSB0cnVlKSB7XG4gICAgICAgICAgICBzY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIGFwcC5hcHBlYXJPblNjcm9sbCgpO1xuICAgICAgICAgICAgYXBwLnNjcm9sbFVwTmF2KCk7XG4gICAgICAgIH0gLy8gZW5kIG9mIGlmIHNjcm9sbGluZ1xuICAgIH0sIDI1MCkgLy8gZW5kIG9mIGludGVydmFsXG59O1xuXG5cbi8vIG1ha2luZyAnbW92ZSBsYXVnaCBwbGF5JyBhbmltYXRlZFxuYXBwLmhlYWRlclRleHRFZmZlY3QgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgJCgnLm1vdmUnKS5hZGRDbGFzcygnaGVhZGVyVGV4dEVmZmVjdCcpO1xuICAgIH0sIDIwMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoJy5sYXVnaCcpLmFkZENsYXNzKCdoZWFkZXJUZXh0RWZmZWN0Jyk7XG4gICAgfSwgMzAwKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgJCgnLnBsYXknKS5hZGRDbGFzcygnaGVhZGVyVGV4dEVmZmVjdCcpO1xuICAgIH0sIDQwMCk7XG59XG5cbi8vIHRvIHZpZXcgZGlmZmVyZW50IHRlYW0gbWVtYmVycyBcbmFwcC52aWV3VGVhbSA9IGZ1bmN0aW9uKCkge1xuICAgICQoJy50ZWFtSW1hZ2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcuc2hvd1RlYW0nKS5hZGRDbGFzcygnZmFkZScpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICQoJy5zaG93VGVhbScpLnJlbW92ZUNsYXNzKCdzaG93VGVhbScpO1xuICAgICAgICB9LCAyMDApXG5cbiAgICAgICAgLy8gaGlkZSBvdmVybGF5IG9uIHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgJCgnLmhpZGVPdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2hpZGVPdmVybGF5Jyk7XG5cbiAgICAgICAgbGV0IHJlbW92ZU92ZXJsYXkgPSAkKHRoaXMpLmZpbmQoJy5pbWFnZU92ZXJsYXknKTtcbiAgICAgICAgJChyZW1vdmVPdmVybGF5KS5hZGRDbGFzcygnaGlkZU92ZXJsYXknKTtcblxuICAgICAgICAvLyBzaG93IHRoZSBiaW8gb2YgdGhlIHNlbGVjdGVkIHBlcnNvblxuICAgICAgICBsZXQgY2xpY2tlZFBlcnNvbiA9ICQodGhpcykuZGF0YSgnc3JjJyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgb3BlblByb2ZpbGUgPSAkKCcuYWJvdXRDb250ZW50JykuZmluZCgnLmFib3V0QmxvY2snKTtcblxuICAgICAgICAkLmVhY2gob3BlblByb2ZpbGUsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcblxuICAgICAgICAgICAgbGV0IG5hbWUgPSAoJCh2YWx1ZSkuYXR0cignZGF0YS1zcmMnKSk7XG5cbiAgICAgICAgICAgIGlmIChjbGlja2VkUGVyc29uID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgJCh2YWx1ZSkuYWRkQ2xhc3MoJ2ZhZGUnKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzaG93VGVhbScpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCcuc2hvd1RlYW0nKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICAgICAgfSwgNjAwLCAnc3dpbmcnKTtcbiAgICAgICAgICAgICAgICB9LDIwMClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0vLyBlbmQgb2YgdGVybmFyeSBvcGVyYXRvciBcbiAgICAgICAgfSkvLyBlbmQgb2YgbG9vcFxuICAgIH0pLy8gZW5kIG9mIGV2ZW50XG59XG5cbmFwcC5uYXZCdXR0b24gPSAoKSA9PiB7XG4gICAgJCgnLm92ZXJsYXlCdXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG92ZXJsYXlTaG93aW5nID0gJCgnLm1vYmlsZU5hdicpLmhhc0NsYXNzKCdtb2JpbGVOYXZTaG93Jyk7XG5cbiAgICAgICAgLy8gaWYgdGhlIG5hdiBpc24ndCBvcGVuZWQgeWV0XG4gICAgICAgIGlmKCFvdmVybGF5U2hvd2luZykge1xuICAgICAgICAgICAgJCgnLm1vYmlsZU5hdicpLmFkZENsYXNzKCdtb2JpbGVOYXZTaG93Jyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLmFkZENsYXNzKCdjbG9zZU5hdk92ZXJsYXknKTtcblxuICAgICAgICAvL2lmIG5hdiBpcyBvcGVuZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5tb2JpbGVOYXYnKS5yZW1vdmVDbGFzcygnbW9iaWxlTmF2U2hvdycpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5yZW1vdmVDbGFzcygnY2xvc2VOYXZPdmVybGF5Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSAvLyBlbmQgb2YgaWZcbiAgICB9KS8vIGVuZCBvZiBldmVudFxufVxuXG5hcHAubmF2QWN0aW9uID0gKCkgPT4ge1xuICAgICQoJy5uYXZMaW5rTW9iaWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnLm1vYmlsZU5hdicpLnJlbW92ZUNsYXNzKCdtb2JpbGVOYXZTaG93Jyk7XG4gICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Nsb3NlTmF2T3ZlcmxheScpO1xuICAgIH0pXG59XG5cbi8vIGNoZWNrIGlmIHRoZSBkZXZpY2UgaXMgYSB0b3VjaCBkZXZpY2UsIGFuZCBhZGQgY2xhc3NlcyB0byB0aGUgaG92ZXIgZWxlbWVudHMgaWYgaXQgaXMgbm90IGEgdG91Y2ggZGV2aWNlXG5hcHAuYWRkSG92ZXIgPSAoKSA9PiB7XG5cbiAgICAvLyBjaGVjayBpZiBicm93c2VyIGRvZXNudCcgc3VwcG9ydCB0b3VjaFxuICAgIGxldCB0b3VjaHN1cHBvcnQgPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCAobmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCkgfHwgKG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMClcblxuXG4gICAgaWYgKCF0b3VjaHN1cHBvcnQpIHsgLy8gYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgdG91Y2hcbiAgICAgICAgJCgnLnRlYW1JbWFnZScpLmFkZENsYXNzKCd0ZWFtSW1hZ2VIb3ZlcicpO1xuICAgICAgICBcbiAgICB9XG59XG5cblxuXG4vLyBpbnN0YVRva2VuOiAnMTg4OTU4MDQuYzBhZDhkZS42ODMyMWZkZWQyMmQ0YzUyYWQ2NWZlM2M0M2RkMWNjMScsXG4gICAgLy8gaW5zdGFJRDogJ2MwYWQ4ZGViOTdjMTRiNWU5NGEzZWNlY2NmZjA1YWY0JyxcblxuXG5hcHAuaW5pdCA9ICgpID0+IHtcbiAgICBhcHAuc2Nyb2xsaW5nRXZlbnQoKTtcbiAgICBhcHAuaGVhZGVyVGV4dEVmZmVjdCgpO1xuICAgIGFwcC5zY3JvbGxFZmZlY3RzKCk7XG4gICAgYXBwLnZpZXdUZWFtKCk7XG4gICAgYXBwLm5hdkJ1dHRvbigpO1xuICAgIGFwcC5uYXZBY3Rpb24oKTtcbiAgICBhcHAuYWRkSG92ZXIoKTtcbn1cblxuJChmdW5jdGlvbigpe1xuICAgIGFwcC5pbml0KClcbn0pIl19
