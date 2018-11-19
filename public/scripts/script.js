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

app.submitForm = function () {
    $('#formBody').submit(function (e) {
        e.preventDefault();

        var $form = $(this);
        // //show some response on the button
        // $('button[type="submit"]', $form).each(function () {
        //     let $btn = $(this);
        //     $btn.prop('type', 'button');
        //     $btn.prop('orig_label', $btn.text());
        //     $btn.text('Sending ...');
        // });
        // // after_form_submitted();

        $.ajax({
            type: "POST",
            url: 'scripts/handler.php',
            data: $form.serialize(),
            success: after_form_submitted(),
            dataType: 'JSON'
        });
    });
};

var after_form_submitted = function after_form_submitted() {
    console.log('form submitted');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksWUFBWSxLQUFoQjs7QUFFQSxJQUFJLGlCQUFpQixDQUFyQjs7QUFFQTs7QUFFQSxFQUFFLGNBQUYsRUFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBVSxDQUFWLEVBQWE7QUFDdkMsTUFBRSxjQUFGO0FBQ0EsTUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3BCLG1CQUFXLEVBQUUsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBRixFQUF3QixNQUF4QixHQUFpQztBQUR4QixLQUF4QixFQUVHLEdBRkgsRUFFUSxPQUZSO0FBR0gsQ0FMRDs7QUFPQSxJQUFNLE1BQU0sRUFBWjs7QUFHQTtBQUNBLElBQUksY0FBSixHQUFxQixZQUFNO0FBQ3ZCLE1BQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBWTtBQUN6QixvQkFBWSxJQUFaO0FBRUgsS0FIRDtBQUlILENBTEQ7O0FBT0EsSUFBSSxXQUFKLEdBQWtCLFlBQVk7O0FBRTFCLFFBQUksWUFBWSxFQUFFLFFBQUYsRUFBWSxNQUFaLEdBQXFCLEdBQXJDO0FBQ0EsUUFBSSxlQUFlLEVBQUUsUUFBRixFQUFZLE1BQVosR0FBcUIsR0FBckIsR0FBMkIsRUFBRSxRQUFGLEVBQVksV0FBWixFQUE5QztBQUNBLFFBQUksZUFBZSxFQUFFLE1BQUYsRUFBVSxTQUFWLEtBQXdCLE9BQU8sV0FBbEQ7QUFDQSxRQUFJLFlBQVksRUFBRSxNQUFGLEVBQVUsU0FBVixFQUFoQjs7QUFFQSxRQUFJLGdCQUFnQixFQUFFLE1BQUYsRUFBVSxTQUFWLEVBQXBCOztBQUVBO0FBQ0EsUUFBSSxnQkFBZ0IsY0FBcEIsRUFBb0M7QUFDaEM7QUFDQSxZQUFJLGVBQWUsU0FBZixJQUE0QixZQUFZLFlBQTVDLEVBQTBEO0FBQ3RE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QUNBLFFBQUksU0FBSjtBQUNBLFFBQUksU0FBSjtBQUNBLFFBQUksUUFBSjtBQUNILENBVEQ7O0FBV0EsRUFBRSxZQUFVO0FBQ1IsUUFBSSxJQUFKO0FBQ0gsQ0FGRDs7QUFRQTtBQUNBOztBQUVJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibGV0IHNjcm9sbGluZyA9IGZhbHNlO1xuXG5sZXQgcHJldmlvdXNTY3JvbGwgPSAwO1xuXG4vL3Ntb290aCBzY3JvbGxpbmdcblxuJCgnYVtocmVmKj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wXG4gICAgfSwgOTAwLCAnc3dpbmcnKTtcbn0pO1xuXG5jb25zdCBhcHAgPSB7fVxuXG5cbi8vIHNjcm9sbCBldmVudCBcbmFwcC5zY3JvbGxpbmdFdmVudCA9ICgpID0+IHtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2Nyb2xsaW5nID0gdHJ1ZTtcblxuICAgIH0pXG59XG5cbmFwcC5zY3JvbGxVcE5hdiA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCBoZWFkZXJUb3AgPSAkKFwiaGVhZGVyXCIpLm9mZnNldCgpLnRvcDtcbiAgICBsZXQgaGVhZGVyQm90dG9tID0gJChcImhlYWRlclwiKS5vZmZzZXQoKS50b3AgKyAkKFwiaGVhZGVyXCIpLm91dGVySGVpZ2h0KCk7XG4gICAgbGV0IHNjcmVlbkJvdHRvbSA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBsZXQgc2NyZWVuVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgbGV0IGN1cnJlbnRTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAvL3Njcm9sbGluZyB1cCBcbiAgICBpZiAoY3VycmVudFNjcm9sbCA8IHByZXZpb3VzU2Nyb2xsKSB7XG4gICAgICAgIC8vYW5kIGhlYWRlciBpcyBpbiB2aWV3XG4gICAgICAgIGlmIChzY3JlZW5Cb3R0b20gPiBoZWFkZXJUb3AgJiYgc2NyZWVuVG9wIDwgaGVhZGVyQm90dG9tKSB7XG4gICAgICAgICAgICAkKCcubG9nbycpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcubmF2TGluaycpLnJlbW92ZUNsYXNzKCduYXZMaW5rU2Nyb2xsVXAnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJOYXYnKS5yZW1vdmVDbGFzcygnbmF2R29uZSBuYXZPdmVybGF5Jyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLnJlbW92ZUNsYXNzKCduYXZCdXR0b25CbGFjaycpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGVhZGVyIGlzIG5vdCBpbiB2aWV3XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLm5hdkxpbmsnKS5hZGRDbGFzcygnbmF2TGlua1Njcm9sbFVwJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTmF2JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbmF2T3ZlcmxheScpO1xuICAgICAgICAgICAgJCgnLnRlc3QnKS5hZGRDbGFzcygndGVzdFNob3cnKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykuYWRkQ2xhc3MoJ25hdkJ1dHRvbkJsYWNrJyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL3Njcm9sbGluZyBkb3duXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPiBwcmV2aW91c1Njcm9sbCkge1xuICAgICAgICAvLyBoZWFkZXIgaXMgaW4gdmlld1xuICAgICAgICBpZiAoKHNjcmVlbkJvdHRvbSA+IGhlYWRlclRvcCkgJiYgKHNjcmVlblRvcCA8IGhlYWRlckJvdHRvbSkpIHtcbiAgICAgICAgICAgIC8vICQoJy5sb2dvJykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGVhZGVyIGlzIG5vdCBpbiB2aWV3XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmxvZ28nKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLm5hdkxpbmsnKS5yZW1vdmVDbGFzcygnbmF2TGlua1Njcm9sbFVwJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTmF2JykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgfS8vIGVuZCBvZiBlbHNlIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgIH0gLy8gZW5kIG9mIHNjcm9sbGluZyBkb3duXG5cbiAgICBwcmV2aW91c1Njcm9sbCA9IGN1cnJlbnRTY3JvbGw7XG5cbn1cblxuYXBwLnNjcm9sbEVmZmVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2Nyb2xsaW5nID0gdHJ1ZSkge1xuICAgICAgICAgICAgc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBhcHAuYXBwZWFyT25TY3JvbGwoKTtcbiAgICAgICAgICAgIGFwcC5zY3JvbGxVcE5hdigpO1xuICAgICAgICB9IC8vIGVuZCBvZiBpZiBzY3JvbGxpbmdcbiAgICB9LCAyNTApIC8vIGVuZCBvZiBpbnRlcnZhbFxufTtcblxuXG4vLyBtYWtpbmcgJ21vdmUgbGF1Z2ggcGxheScgYW5pbWF0ZWRcbmFwcC5oZWFkZXJUZXh0RWZmZWN0ID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICQoJy5tb3ZlJykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCAyMDApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkKCcubGF1Z2gnKS5hZGRDbGFzcygnaGVhZGVyVGV4dEVmZmVjdCcpO1xuICAgIH0sIDMwMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoJy5wbGF5JykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCA0MDApO1xufVxuXG4vLyB0byB2aWV3IGRpZmZlcmVudCB0ZWFtIG1lbWJlcnMgXG5hcHAudmlld1RlYW0gPSBmdW5jdGlvbigpIHtcbiAgICAkKCcudGVhbUltYWdlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLnNob3dUZWFtJykuYWRkQ2xhc3MoJ2ZhZGUnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCcuc2hvd1RlYW0nKS5yZW1vdmVDbGFzcygnc2hvd1RlYW0nKTtcbiAgICAgICAgfSwgMjAwKVxuXG4gICAgICAgIC8vIGhpZGUgb3ZlcmxheSBvbiBzZWxlY3RlZCBpdGVtXG4gICAgICAgICQoJy5oaWRlT3ZlcmxheScpLnJlbW92ZUNsYXNzKCdoaWRlT3ZlcmxheScpO1xuXG4gICAgICAgIGxldCByZW1vdmVPdmVybGF5ID0gJCh0aGlzKS5maW5kKCcuaW1hZ2VPdmVybGF5Jyk7XG4gICAgICAgICQocmVtb3ZlT3ZlcmxheSkuYWRkQ2xhc3MoJ2hpZGVPdmVybGF5Jyk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgYmlvIG9mIHRoZSBzZWxlY3RlZCBwZXJzb25cbiAgICAgICAgbGV0IGNsaWNrZWRQZXJzb24gPSAkKHRoaXMpLmRhdGEoJ3NyYycpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG9wZW5Qcm9maWxlID0gJCgnLmFib3V0Q29udGVudCcpLmZpbmQoJy5hYm91dEJsb2NrJyk7XG5cbiAgICAgICAgJC5lYWNoKG9wZW5Qcm9maWxlLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG5cbiAgICAgICAgICAgIGxldCBuYW1lID0gKCQodmFsdWUpLmF0dHIoJ2RhdGEtc3JjJykpO1xuXG4gICAgICAgICAgICBpZiAoY2xpY2tlZFBlcnNvbiA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICQodmFsdWUpLmFkZENsYXNzKCdmYWRlJylcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2hvd1RlYW0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCgnLnNob3dUZWFtJykub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgICAgIH0sIDYwMCwgJ3N3aW5nJyk7XG4gICAgICAgICAgICAgICAgfSwyMDApXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9Ly8gZW5kIG9mIHRlcm5hcnkgb3BlcmF0b3IgXG4gICAgICAgIH0pLy8gZW5kIG9mIGxvb3BcbiAgICB9KS8vIGVuZCBvZiBldmVudFxufVxuXG5hcHAubmF2QnV0dG9uID0gKCkgPT4ge1xuICAgICQoJy5vdmVybGF5QnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBvdmVybGF5U2hvd2luZyA9ICQoJy5tb2JpbGVOYXYnKS5oYXNDbGFzcygnbW9iaWxlTmF2U2hvdycpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBuYXYgaXNuJ3Qgb3BlbmVkIHlldFxuICAgICAgICBpZighb3ZlcmxheVNob3dpbmcpIHtcbiAgICAgICAgICAgICQoJy5tb2JpbGVOYXYnKS5hZGRDbGFzcygnbW9iaWxlTmF2U2hvdycpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5hZGRDbGFzcygnY2xvc2VOYXZPdmVybGF5Jyk7XG5cbiAgICAgICAgLy9pZiBuYXYgaXMgb3BlbmVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcubW9iaWxlTmF2JykucmVtb3ZlQ2xhc3MoJ21vYmlsZU5hdlNob3cnKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Nsb3NlTmF2T3ZlcmxheScpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gLy8gZW5kIG9mIGlmXG4gICAgfSkvLyBlbmQgb2YgZXZlbnRcbn1cblxuYXBwLm5hdkFjdGlvbiA9ICgpID0+IHtcbiAgICAkKCcubmF2TGlua01vYmlsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJy5tb2JpbGVOYXYnKS5yZW1vdmVDbGFzcygnbW9iaWxlTmF2U2hvdycpO1xuICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLnJlbW92ZUNsYXNzKCdjbG9zZU5hdk92ZXJsYXknKTtcbiAgICB9KVxufVxuXG4vLyBjaGVjayBpZiB0aGUgZGV2aWNlIGlzIGEgdG91Y2ggZGV2aWNlLCBhbmQgYWRkIGNsYXNzZXMgdG8gdGhlIGhvdmVyIGVsZW1lbnRzIGlmIGl0IGlzIG5vdCBhIHRvdWNoIGRldmljZVxuYXBwLmFkZEhvdmVyID0gKCkgPT4ge1xuXG4gICAgLy8gY2hlY2sgaWYgYnJvd3NlciBkb2VzbnQnIHN1cHBvcnQgdG91Y2hcbiAgICBsZXQgdG91Y2hzdXBwb3J0ID0gKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgKG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDApIHx8IChuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDApXG5cblxuICAgIGlmICghdG91Y2hzdXBwb3J0KSB7IC8vIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IHRvdWNoXG4gICAgICAgICQoJy50ZWFtSW1hZ2UnKS5hZGRDbGFzcygndGVhbUltYWdlSG92ZXInKTtcbiAgICAgICAgXG4gICAgfVxufVxuXG5hcHAuc3VibWl0Rm9ybSA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNmb3JtQm9keScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgLy8gLy9zaG93IHNvbWUgcmVzcG9uc2Ugb24gdGhlIGJ1dHRvblxuICAgICAgICAvLyAkKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScsICRmb3JtKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICAgIGxldCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgLy8gICAgICRidG4ucHJvcCgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgLy8gICAgICRidG4ucHJvcCgnb3JpZ19sYWJlbCcsICRidG4udGV4dCgpKTtcbiAgICAgICAgLy8gICAgICRidG4udGV4dCgnU2VuZGluZyAuLi4nKTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIC8vIGFmdGVyX2Zvcm1fc3VibWl0dGVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiAnc2NyaXB0cy9oYW5kbGVyLnBocCcsXG4gICAgICAgICAgICBkYXRhOiAkZm9ybS5zZXJpYWxpemUoKSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGFmdGVyX2Zvcm1fc3VibWl0dGVkKCksXG4gICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn1cbiBcbmxldCBhZnRlcl9mb3JtX3N1Ym1pdHRlZCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnZm9ybSBzdWJtaXR0ZWQnKTtcbiAgICBcbn1cblxuXG5hcHAuaW5pdCA9ICgpID0+IHtcbiAgICBhcHAuc3VibWl0Rm9ybSgpO1xuICAgIGFwcC5zY3JvbGxpbmdFdmVudCgpO1xuICAgIGFwcC5oZWFkZXJUZXh0RWZmZWN0KCk7XG4gICAgYXBwLnNjcm9sbEVmZmVjdHMoKTtcbiAgICBhcHAudmlld1RlYW0oKTtcbiAgICBhcHAubmF2QnV0dG9uKCk7XG4gICAgYXBwLm5hdkFjdGlvbigpO1xuICAgIGFwcC5hZGRIb3ZlcigpO1xufVxuXG4kKGZ1bmN0aW9uKCl7XG4gICAgYXBwLmluaXQoKVxufSlcblxuICAgICAgICBcblxuXG5cbi8vIGxldCBhZnRlcl9mb3JtX3N1Ym1pdHRlZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4vLyAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAvLyBpZiAoZGF0YS5yZXN1bHQgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgLy8gICAgICQoJ2Zvcm0jcmV1c2VkX2Zvcm0nKS5oaWRlKCk7XG4gICAgLy8gICAgICQoJyNzdWNjZXNzX21lc3NhZ2UnKS5zaG93KCk7XG4gICAgLy8gICAgICQoJyNlcnJvcl9tZXNzYWdlJykuaGlkZSgpO1xuICAgIC8vIH1cbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5hcHBlbmQoJzx1bD48L3VsPicpO1xuXG4gICAgLy8gICAgIGpRdWVyeS5lYWNoKGRhdGEuZXJyb3JzLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICAvLyAgICAgICAgICQoJyNlcnJvcl9tZXNzYWdlIHVsJykuYXBwZW5kKCc8bGk+JyArIGtleSArICc6JyArIHZhbCArICc8L2xpPicpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgJCgnI3N1Y2Nlc3NfbWVzc2FnZScpLmhpZGUoKTtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5zaG93KCk7XG5cbiAgICAvLyAgICAgLy9yZXZlcnNlIHRoZSByZXNwb25zZSBvbiB0aGUgYnV0dG9uXG4gICAgLy8gICAgICQoJ2J1dHRvblt0eXBlPVwiYnV0dG9uXCJdJywgJGZvcm0pLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICAgICAgJGJ0biA9ICQodGhpcyk7XG4gICAgLy8gICAgICAgICBsYWJlbCA9ICRidG4ucHJvcCgnb3JpZ19sYWJlbCcpO1xuICAgIC8vICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi5wcm9wKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgIC8vICAgICAgICAgICAgICRidG4udGV4dChsYWJlbCk7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi5wcm9wKCdvcmlnX2xhYmVsJywgJycpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9Ly8gZW5kIG9mIGVsc2Vcbi8vIH1cbiBcbiJdfQ==
