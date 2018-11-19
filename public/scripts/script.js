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

app.init = function () {
    app.submitForm();
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

// app.submitForm = function() {
//     $('#formBody').submit(function (e) {
//         e.preventDefault();

//         let $form = $(this);
//         //show some response on the button
//         $('button[type="submit"]', $form).each(function () {
//             let $btn = $(this);
//             $btn.prop('type', 'button');
//             $btn.prop('orig_label', $btn.text());
//             $btn.text('Sending ...');
//         });
//         after_form_submitted();

//         $.ajax({
//             type: "POST",
//             url: 'handler.php',
//             data: $form.serialize(),
//             success: after_form_submitted,
//             dataType: 'JSON'
//         });

//     });

// }

// let after_form_submitted = function (data) {
//     console.log(data);

// if (data.result == 'success') {
//     $('form#reused_form').hide();
//     $('#success_message').show();
//     $('#error_message').hide();
// }
// else {
//     $('#error_message').append('<ul></ul>');

//     jQuery.each(data.errors, function (key, val) {
//         $('#error_message ul').append('<li>' + key + ':' + val + '</li>');
//     });
//     $('#success_message').hide();
//     $('#error_message').show();

//     //reverse the response on the button
//     $('button[type="button"]', $form).each(function () {
//         $btn = $(this);
//         label = $btn.prop('orig_label');
//         if (label) {
//             $btn.prop('type', 'submit');
//             $btn.text(label);
//             $btn.prop('orig_label', '');
//         }
//     });
// }// end of else
// }

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksWUFBWSxLQUFoQjs7QUFFQSxJQUFJLGlCQUFpQixDQUFyQjs7QUFFQTs7QUFFQSxFQUFFLGNBQUYsRUFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBVSxDQUFWLEVBQWE7QUFDdkMsTUFBRSxjQUFGO0FBQ0EsTUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3BCLG1CQUFXLEVBQUUsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBRixFQUF3QixNQUF4QixHQUFpQztBQUR4QixLQUF4QixFQUVHLEdBRkgsRUFFUSxPQUZSO0FBR0gsQ0FMRDs7QUFPQSxJQUFNLE1BQU0sRUFBWjs7QUFHQTtBQUNBLElBQUksY0FBSixHQUFxQixZQUFNO0FBQ3ZCLE1BQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBWTtBQUN6QixvQkFBWSxJQUFaO0FBRUgsS0FIRDtBQUlILENBTEQ7O0FBT0EsSUFBSSxXQUFKLEdBQWtCLFlBQVk7O0FBRTFCLFFBQUksWUFBWSxFQUFFLFFBQUYsRUFBWSxNQUFaLEdBQXFCLEdBQXJDO0FBQ0EsUUFBSSxlQUFlLEVBQUUsUUFBRixFQUFZLE1BQVosR0FBcUIsR0FBckIsR0FBMkIsRUFBRSxRQUFGLEVBQVksV0FBWixFQUE5QztBQUNBLFFBQUksZUFBZSxFQUFFLE1BQUYsRUFBVSxTQUFWLEtBQXdCLE9BQU8sV0FBbEQ7QUFDQSxRQUFJLFlBQVksRUFBRSxNQUFGLEVBQVUsU0FBVixFQUFoQjs7QUFFQSxRQUFJLGdCQUFnQixFQUFFLE1BQUYsRUFBVSxTQUFWLEVBQXBCOztBQUVBO0FBQ0EsUUFBSSxnQkFBZ0IsY0FBcEIsRUFBb0M7QUFDaEM7QUFDQSxZQUFJLGVBQWUsU0FBZixJQUE0QixZQUFZLFlBQTVDLEVBQTBEO0FBQ3RE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Iiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCBzY3JvbGxpbmcgPSBmYWxzZTtcblxubGV0IHByZXZpb3VzU2Nyb2xsID0gMDtcblxuLy9zbW9vdGggc2Nyb2xsaW5nXG5cbiQoJ2FbaHJlZio9XCIjXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICQoJCh0aGlzKS5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcFxuICAgIH0sIDkwMCwgJ3N3aW5nJyk7XG59KTtcblxuY29uc3QgYXBwID0ge31cblxuXG4vLyBzY3JvbGwgZXZlbnQgXG5hcHAuc2Nyb2xsaW5nRXZlbnQgPSAoKSA9PiB7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjcm9sbGluZyA9IHRydWU7XG5cbiAgICB9KVxufVxuXG5hcHAuc2Nyb2xsVXBOYXYgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBsZXQgaGVhZGVyVG9wID0gJChcImhlYWRlclwiKS5vZmZzZXQoKS50b3A7XG4gICAgbGV0IGhlYWRlckJvdHRvbSA9ICQoXCJoZWFkZXJcIikub2Zmc2V0KCkudG9wICsgJChcImhlYWRlclwiKS5vdXRlckhlaWdodCgpO1xuICAgIGxldCBzY3JlZW5Cb3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgbGV0IHNjcmVlblRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgIGxldCBjdXJyZW50U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy9zY3JvbGxpbmcgdXAgXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPCBwcmV2aW91c1Njcm9sbCkge1xuICAgICAgICAvL2FuZCBoZWFkZXIgaXMgaW4gdmlld1xuICAgICAgICBpZiAoc2NyZWVuQm90dG9tID4gaGVhZGVyVG9wICYmIHNjcmVlblRvcCA8IGhlYWRlckJvdHRvbSkge1xuICAgICAgICAgICAgJCgnLmxvZ28nKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLm5hdkxpbmsnKS5yZW1vdmVDbGFzcygnbmF2TGlua1Njcm9sbFVwJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTmF2JykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUgbmF2T3ZlcmxheScpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5yZW1vdmVDbGFzcygnbmF2QnV0dG9uQmxhY2snKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5uYXZMaW5rJykuYWRkQ2xhc3MoJ25hdkxpbmtTY3JvbGxVcCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlck5hdicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCduYXZHb25lJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ25hdk92ZXJsYXknKTtcbiAgICAgICAgICAgICQoJy50ZXN0JykuYWRkQ2xhc3MoJ3Rlc3RTaG93Jyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLmFkZENsYXNzKCduYXZCdXR0b25CbGFjaycpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9zY3JvbGxpbmcgZG93blxuICAgIGlmIChjdXJyZW50U2Nyb2xsID4gcHJldmlvdXNTY3JvbGwpIHtcbiAgICAgICAgLy8gaGVhZGVyIGlzIGluIHZpZXdcbiAgICAgICAgaWYgKChzY3JlZW5Cb3R0b20gPiBoZWFkZXJUb3ApICYmIChzY3JlZW5Ub3AgPCBoZWFkZXJCb3R0b20pKSB7XG4gICAgICAgICAgICAvLyAkKCcubG9nbycpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5sb2dvJykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5uYXZMaW5rJykucmVtb3ZlQ2xhc3MoJ25hdkxpbmtTY3JvbGxVcCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlck5hdicpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgIH0vLyBlbmQgb2YgZWxzZSBoZWFkZXIgaXMgbm90IGluIHZpZXdcbiAgICB9IC8vIGVuZCBvZiBzY3JvbGxpbmcgZG93blxuXG4gICAgcHJldmlvdXNTY3JvbGwgPSBjdXJyZW50U2Nyb2xsO1xuXG59XG5cbmFwcC5zY3JvbGxFZmZlY3RzID0gZnVuY3Rpb24gKCkge1xuICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNjcm9sbGluZyA9IHRydWUpIHtcbiAgICAgICAgICAgIHNjcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gYXBwLmFwcGVhck9uU2Nyb2xsKCk7XG4gICAgICAgICAgICBhcHAuc2Nyb2xsVXBOYXYoKTtcbiAgICAgICAgfSAvLyBlbmQgb2YgaWYgc2Nyb2xsaW5nXG4gICAgfSwgMjUwKSAvLyBlbmQgb2YgaW50ZXJ2YWxcbn07XG5cblxuLy8gbWFraW5nICdtb3ZlIGxhdWdoIHBsYXknIGFuaW1hdGVkXG5hcHAuaGVhZGVyVGV4dEVmZmVjdCA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAkKCcubW92ZScpLmFkZENsYXNzKCdoZWFkZXJUZXh0RWZmZWN0Jyk7XG4gICAgfSwgMjAwKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgJCgnLmxhdWdoJykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCAzMDApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkKCcucGxheScpLmFkZENsYXNzKCdoZWFkZXJUZXh0RWZmZWN0Jyk7XG4gICAgfSwgNDAwKTtcbn1cblxuLy8gdG8gdmlldyBkaWZmZXJlbnQgdGVhbSBtZW1iZXJzIFxuYXBwLnZpZXdUZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnLnRlYW1JbWFnZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5zaG93VGVhbScpLmFkZENsYXNzKCdmYWRlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnNob3dUZWFtJykucmVtb3ZlQ2xhc3MoJ3Nob3dUZWFtJyk7XG4gICAgICAgIH0sIDIwMClcblxuICAgICAgICAvLyBoaWRlIG92ZXJsYXkgb24gc2VsZWN0ZWQgaXRlbVxuICAgICAgICAkKCcuaGlkZU92ZXJsYXknKS5yZW1vdmVDbGFzcygnaGlkZU92ZXJsYXknKTtcblxuICAgICAgICBsZXQgcmVtb3ZlT3ZlcmxheSA9ICQodGhpcykuZmluZCgnLmltYWdlT3ZlcmxheScpO1xuICAgICAgICAkKHJlbW92ZU92ZXJsYXkpLmFkZENsYXNzKCdoaWRlT3ZlcmxheScpO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIGJpbyBvZiB0aGUgc2VsZWN0ZWQgcGVyc29uXG4gICAgICAgIGxldCBjbGlja2VkUGVyc29uID0gJCh0aGlzKS5kYXRhKCdzcmMnKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBvcGVuUHJvZmlsZSA9ICQoJy5hYm91dENvbnRlbnQnKS5maW5kKCcuYWJvdXRCbG9jaycpO1xuXG4gICAgICAgICQuZWFjaChvcGVuUHJvZmlsZSwgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICgkKHZhbHVlKS5hdHRyKCdkYXRhLXNyYycpKTtcblxuICAgICAgICAgICAgaWYgKGNsaWNrZWRQZXJzb24gPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAkKHZhbHVlKS5hZGRDbGFzcygnZmFkZScpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3Nob3dUZWFtJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmFkZScpO1xuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoJy5zaG93VGVhbScpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICAgICAgICB9LCA2MDAsICdzd2luZycpO1xuICAgICAgICAgICAgICAgIH0sMjAwKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfS8vIGVuZCBvZiB0ZXJuYXJ5IG9wZXJhdG9yIFxuICAgICAgICB9KS8vIGVuZCBvZiBsb29wXG4gICAgfSkvLyBlbmQgb2YgZXZlbnRcbn1cblxuYXBwLm5hdkJ1dHRvbiA9ICgpID0+IHtcbiAgICAkKCcub3ZlcmxheUJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgb3ZlcmxheVNob3dpbmcgPSAkKCcubW9iaWxlTmF2JykuaGFzQ2xhc3MoJ21vYmlsZU5hdlNob3cnKTtcblxuICAgICAgICAvLyBpZiB0aGUgbmF2IGlzbid0IG9wZW5lZCB5ZXRcbiAgICAgICAgaWYoIW92ZXJsYXlTaG93aW5nKSB7XG4gICAgICAgICAgICAkKCcubW9iaWxlTmF2JykuYWRkQ2xhc3MoJ21vYmlsZU5hdlNob3cnKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykuYWRkQ2xhc3MoJ2Nsb3NlTmF2T3ZlcmxheScpO1xuXG4gICAgICAgIC8vaWYgbmF2IGlzIG9wZW5lZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLm1vYmlsZU5hdicpLnJlbW92ZUNsYXNzKCdtb2JpbGVOYXZTaG93Jyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLnJlbW92ZUNsYXNzKCdjbG9zZU5hdk92ZXJsYXknKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9IC8vIGVuZCBvZiBpZlxuICAgIH0pLy8gZW5kIG9mIGV2ZW50XG59XG5cbmFwcC5uYXZBY3Rpb24gPSAoKSA9PiB7XG4gICAgJCgnLm5hdkxpbmtNb2JpbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcubW9iaWxlTmF2JykucmVtb3ZlQ2xhc3MoJ21vYmlsZU5hdlNob3cnKTtcbiAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5yZW1vdmVDbGFzcygnY2xvc2VOYXZPdmVybGF5Jyk7XG4gICAgfSlcbn1cblxuLy8gY2hlY2sgaWYgdGhlIGRldmljZSBpcyBhIHRvdWNoIGRldmljZSwgYW5kIGFkZCBjbGFzc2VzIHRvIHRoZSBob3ZlciBlbGVtZW50cyBpZiBpdCBpcyBub3QgYSB0b3VjaCBkZXZpY2VcbmFwcC5hZGRIb3ZlciA9ICgpID0+IHtcblxuICAgIC8vIGNoZWNrIGlmIGJyb3dzZXIgZG9lc250JyBzdXBwb3J0IHRvdWNoXG4gICAgbGV0IHRvdWNoc3VwcG9ydCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IChuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKSB8fCAobmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKVxuXG5cbiAgICBpZiAoIXRvdWNoc3VwcG9ydCkgeyAvLyBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCB0b3VjaFxuICAgICAgICAkKCcudGVhbUltYWdlJykuYWRkQ2xhc3MoJ3RlYW1JbWFnZUhvdmVyJyk7XG4gICAgICAgIFxuICAgIH1cbn1cbiBcblxuXG5hcHAuaW5pdCA9ICgpID0+IHtcbiAgICBhcHAuc3VibWl0Rm9ybSgpO1xuICAgIGFwcC5zY3JvbGxpbmdFdmVudCgpO1xuICAgIGFwcC5oZWFkZXJUZXh0RWZmZWN0KCk7XG4gICAgYXBwLnNjcm9sbEVmZmVjdHMoKTtcbiAgICBhcHAudmlld1RlYW0oKTtcbiAgICBhcHAubmF2QnV0dG9uKCk7XG4gICAgYXBwLm5hdkFjdGlvbigpO1xuICAgIGFwcC5hZGRIb3ZlcigpO1xufVxuXG4kKGZ1bmN0aW9uKCl7XG4gICAgYXBwLmluaXQoKVxufSlcblxuICAgICAgICBcblxuICAgICAgICAvLyBhcHAuc3VibWl0Rm9ybSA9IGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyNmb3JtQm9keScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuLy8gICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbi8vICAgICAgICAgbGV0ICRmb3JtID0gJCh0aGlzKTtcbi8vICAgICAgICAgLy9zaG93IHNvbWUgcmVzcG9uc2Ugb24gdGhlIGJ1dHRvblxuLy8gICAgICAgICAkKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScsICRmb3JtKS5lYWNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIGxldCAkYnRuID0gJCh0aGlzKTtcbi8vICAgICAgICAgICAgICRidG4ucHJvcCgndHlwZScsICdidXR0b24nKTtcbi8vICAgICAgICAgICAgICRidG4ucHJvcCgnb3JpZ19sYWJlbCcsICRidG4udGV4dCgpKTtcbi8vICAgICAgICAgICAgICRidG4udGV4dCgnU2VuZGluZyAuLi4nKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIGFmdGVyX2Zvcm1fc3VibWl0dGVkKCk7XG5cbi8vICAgICAgICAgJC5hamF4KHtcbi8vICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuLy8gICAgICAgICAgICAgdXJsOiAnaGFuZGxlci5waHAnLFxuLy8gICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4vLyAgICAgICAgICAgICBzdWNjZXNzOiBhZnRlcl9mb3JtX3N1Ym1pdHRlZCxcbi8vICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTidcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICB9KTtcblxuLy8gfVxuXG4vLyBsZXQgYWZ0ZXJfZm9ybV9zdWJtaXR0ZWQgPSBmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgLy8gaWYgKGRhdGEucmVzdWx0ID09ICdzdWNjZXNzJykge1xuICAgIC8vICAgICAkKCdmb3JtI3JldXNlZF9mb3JtJykuaGlkZSgpO1xuICAgIC8vICAgICAkKCcjc3VjY2Vzc19tZXNzYWdlJykuc2hvdygpO1xuICAgIC8vICAgICAkKCcjZXJyb3JfbWVzc2FnZScpLmhpZGUoKTtcbiAgICAvLyB9XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICAgICQoJyNlcnJvcl9tZXNzYWdlJykuYXBwZW5kKCc8dWw+PC91bD4nKTtcblxuICAgIC8vICAgICBqUXVlcnkuZWFjaChkYXRhLmVycm9ycywgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgLy8gICAgICAgICAkKCcjZXJyb3JfbWVzc2FnZSB1bCcpLmFwcGVuZCgnPGxpPicgKyBrZXkgKyAnOicgKyB2YWwgKyAnPC9saT4nKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgICQoJyNzdWNjZXNzX21lc3NhZ2UnKS5oaWRlKCk7XG4gICAgLy8gICAgICQoJyNlcnJvcl9tZXNzYWdlJykuc2hvdygpO1xuXG4gICAgLy8gICAgIC8vcmV2ZXJzZSB0aGUgcmVzcG9uc2Ugb24gdGhlIGJ1dHRvblxuICAgIC8vICAgICAkKCdidXR0b25bdHlwZT1cImJ1dHRvblwiXScsICRmb3JtKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgICRidG4gPSAkKHRoaXMpO1xuICAgIC8vICAgICAgICAgbGFiZWwgPSAkYnRuLnByb3AoJ29yaWdfbGFiZWwnKTtcbiAgICAvLyAgICAgICAgIGlmIChsYWJlbCkge1xuICAgIC8vICAgICAgICAgICAgICRidG4ucHJvcCgndHlwZScsICdzdWJtaXQnKTtcbiAgICAvLyAgICAgICAgICAgICAkYnRuLnRleHQobGFiZWwpO1xuICAgIC8vICAgICAgICAgICAgICRidG4ucHJvcCgnb3JpZ19sYWJlbCcsICcnKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfS8vIGVuZCBvZiBlbHNlXG4vLyB9XG4gXG4iXX0=
