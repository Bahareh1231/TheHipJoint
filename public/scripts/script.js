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

app.submitForm = function () {
    $('#formBody').submit(function (e) {
        e.preventDefault();

        var $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function () {
            var $btn = $(this);
            $btn.prop('type', 'button');
            $btn.prop('orig_label', $btn.text());
            $btn.text('Sending ...');
        });
        after_form_submitted();

        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: $form.serialize(),
            success: after_form_submitted,
            dataType: 'JSON'
        });
    });
};

var after_form_submitted = function after_form_submitted(data) {
    console.log(data);

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
};

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
            $('.logo').addClass('navGone');
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

app.init = function () {
    app.submitForm();
    app.scrollingEvent();
    app.headerTextEffect();
    app.scrollEffects();
    app.viewTeam();
    app.navButton();
    app.navAction();
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksWUFBWSxLQUFoQjs7QUFFQSxJQUFJLGlCQUFpQixDQUFyQjs7QUFFQTs7QUFFQSxFQUFFLGNBQUYsRUFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBVSxDQUFWLEVBQWE7QUFDdkMsTUFBRSxjQUFGO0FBQ0EsTUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3BCLG1CQUFXLEVBQUUsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBRixFQUF3QixNQUF4QixHQUFpQztBQUR4QixLQUF4QixFQUVHLEdBRkgsRUFFUSxPQUZSO0FBR0gsQ0FMRDs7QUFPQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFJLFVBQUosR0FBaUIsWUFBVztBQUN4QixNQUFFLFdBQUYsRUFBZSxNQUFmLENBQXNCLFVBQVUsQ0FBVixFQUFhO0FBQy9CLFVBQUUsY0FBRjs7QUFFQSxZQUFJLFFBQVEsRUFBRSxJQUFGLENBQVo7QUFDQTtBQUNBLFVBQUUsdUJBQUYsRUFBMkIsS0FBM0IsRUFBa0MsSUFBbEMsQ0FBdUMsWUFBWTtBQUMvQyxnQkFBSSxPQUFPLEVBQUUsSUFBRixDQUFYO0FBQ0EsaUJBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsUUFBbEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsWUFBVixFQUF3QixLQUFLLElBQUwsRUFBeEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsYUFBVjtBQUNILFNBTEQ7QUFNQTs7QUFFQSxVQUFFLElBQUYsQ0FBTztBQUNILGtCQUFNLE1BREg7QUFFSCxpQkFBSyxhQUZGO0FBR0gsa0JBQU0sTUFBTSxTQUFOLEVBSEg7QUFJSCxxQkFBUyxvQkFKTjtBQUtILHNCQUFVO0FBTFAsU0FBUDtBQVFILEtBckJEO0FBdUJILENBeEJEOztBQTBCQSxJQUFJ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O0FBQ0gsS0FIRDtBQUlILENBTEQ7O0FBT0EsSUFBSSxJQUFKLEdBQVcsWUFBTTtBQUNiLFFBQUksVUFBSjtBQUNBLFFBQUksY0FBSjtBQUNBLFFBQUksZ0JBQUo7QUFDQSxRQUFJLGFBQUo7QUFDQSxRQUFJLFFBQUo7QUFDQSxRQUFJLFNBQUo7QUFDQSxRQUFJLFNBQUo7QUFDSCxDQVJEOztBQVVBLEVBQUUsWUFBVTtBQUNSLFFBQUksSUFBSjtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJsZXQgc2Nyb2xsaW5nID0gZmFsc2U7XG5cbmxldCBwcmV2aW91c1Njcm9sbCA9IDA7XG5cbi8vc21vb3RoIHNjcm9sbGluZ1xuXG4kKCdhW2hyZWYqPVwiI1wiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKCQodGhpcykuYXR0cignaHJlZicpKS5vZmZzZXQoKS50b3BcbiAgICB9LCA5MDAsICdzd2luZycpO1xufSk7XG5cbmNvbnN0IGFwcCA9IHt9XG5cbmFwcC5zdWJtaXRGb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnI2Zvcm1Cb2R5Jykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgJGZvcm0gPSAkKHRoaXMpO1xuICAgICAgICAvL3Nob3cgc29tZSByZXNwb25zZSBvbiB0aGUgYnV0dG9uXG4gICAgICAgICQoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJywgJGZvcm0pLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0ICRidG4gPSAkKHRoaXMpO1xuICAgICAgICAgICAgJGJ0bi5wcm9wKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgJGJ0bi5wcm9wKCdvcmlnX2xhYmVsJywgJGJ0bi50ZXh0KCkpO1xuICAgICAgICAgICAgJGJ0bi50ZXh0KCdTZW5kaW5nIC4uLicpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWZ0ZXJfZm9ybV9zdWJtaXR0ZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6ICdoYW5kbGVyLnBocCcsXG4gICAgICAgICAgICBkYXRhOiAkZm9ybS5zZXJpYWxpemUoKSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGFmdGVyX2Zvcm1fc3VibWl0dGVkLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdKU09OJ1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuICAgIFxufVxuXG5sZXQgYWZ0ZXJfZm9ybV9zdWJtaXR0ZWQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIFxuICAgIC8vIGlmIChkYXRhLnJlc3VsdCA9PSAnc3VjY2VzcycpIHtcbiAgICAvLyAgICAgJCgnZm9ybSNyZXVzZWRfZm9ybScpLmhpZGUoKTtcbiAgICAvLyAgICAgJCgnI3N1Y2Nlc3NfbWVzc2FnZScpLnNob3coKTtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5oaWRlKCk7XG4gICAgLy8gfVxuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgICAkKCcjZXJyb3JfbWVzc2FnZScpLmFwcGVuZCgnPHVsPjwvdWw+Jyk7XG5cbiAgICAvLyAgICAgalF1ZXJ5LmVhY2goZGF0YS5lcnJvcnMsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgIC8vICAgICAgICAgJCgnI2Vycm9yX21lc3NhZ2UgdWwnKS5hcHBlbmQoJzxsaT4nICsga2V5ICsgJzonICsgdmFsICsgJzwvbGk+Jyk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICAkKCcjc3VjY2Vzc19tZXNzYWdlJykuaGlkZSgpO1xuICAgIC8vICAgICAkKCcjZXJyb3JfbWVzc2FnZScpLnNob3coKTtcblxuICAgIC8vICAgICAvL3JldmVyc2UgdGhlIHJlc3BvbnNlIG9uIHRoZSBidXR0b25cbiAgICAvLyAgICAgJCgnYnV0dG9uW3R5cGU9XCJidXR0b25cIl0nLCAkZm9ybSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICAgICAkYnRuID0gJCh0aGlzKTtcbiAgICAvLyAgICAgICAgIGxhYmVsID0gJGJ0bi5wcm9wKCdvcmlnX2xhYmVsJyk7XG4gICAgLy8gICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAvLyAgICAgICAgICAgICAkYnRuLnByb3AoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi50ZXh0KGxhYmVsKTtcbiAgICAvLyAgICAgICAgICAgICAkYnRuLnByb3AoJ29yaWdfbGFiZWwnLCAnJyk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0vLyBlbmQgb2YgZWxzZVxufVxuXG5cbi8vIHNjcm9sbCBldmVudCBcbmFwcC5zY3JvbGxpbmdFdmVudCA9ICgpID0+IHtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2Nyb2xsaW5nID0gdHJ1ZTtcblxuICAgIH0pXG59XG5cbmFwcC5zY3JvbGxVcE5hdiA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCBoZWFkZXJUb3AgPSAkKFwiaGVhZGVyXCIpLm9mZnNldCgpLnRvcDtcbiAgICBsZXQgaGVhZGVyQm90dG9tID0gJChcImhlYWRlclwiKS5vZmZzZXQoKS50b3AgKyAkKFwiaGVhZGVyXCIpLm91dGVySGVpZ2h0KCk7XG4gICAgbGV0IHNjcmVlbkJvdHRvbSA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBsZXQgc2NyZWVuVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgbGV0IGN1cnJlbnRTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAvL3Njcm9sbGluZyB1cCBcbiAgICBpZiAoY3VycmVudFNjcm9sbCA8IHByZXZpb3VzU2Nyb2xsKSB7XG4gICAgICAgIC8vYW5kIGhlYWRlciBpcyBpbiB2aWV3XG4gICAgICAgIGlmIChzY3JlZW5Cb3R0b20gPiBoZWFkZXJUb3AgJiYgc2NyZWVuVG9wIDwgaGVhZGVyQm90dG9tKSB7XG4gICAgICAgICAgICAkKCcubG9nbycpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcubmF2TGluaycpLnJlbW92ZUNsYXNzKCduYXZMaW5rU2Nyb2xsVXAnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJOYXYnKS5yZW1vdmVDbGFzcygnbmF2R29uZSBuYXZPdmVybGF5Jyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLnJlbW92ZUNsYXNzKCduYXZCdXR0b25CbGFjaycpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGVhZGVyIGlzIG5vdCBpbiB2aWV3XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLm5hdkxpbmsnKS5hZGRDbGFzcygnbmF2TGlua1Njcm9sbFVwJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTmF2JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbmF2T3ZlcmxheScpO1xuICAgICAgICAgICAgJCgnLnRlc3QnKS5hZGRDbGFzcygndGVzdFNob3cnKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykuYWRkQ2xhc3MoJ25hdkJ1dHRvbkJsYWNrJyk7XG4gICAgICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL3Njcm9sbGluZyBkb3duXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPiBwcmV2aW91c1Njcm9sbCkge1xuICAgICAgICAvLyBoZWFkZXIgaXMgaW4gdmlld1xuICAgICAgICBpZiAoKHNjcmVlbkJvdHRvbSA+IGhlYWRlclRvcCkgJiYgKHNjcmVlblRvcCA8IGhlYWRlckJvdHRvbSkpIHtcbiAgICAgICAgICAgICQoJy5sb2dvJykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGVhZGVyIGlzIG5vdCBpbiB2aWV3XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmxvZ28nKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLm5hdkxpbmsnKS5yZW1vdmVDbGFzcygnbmF2TGlua1Njcm9sbFVwJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTmF2JykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgfS8vIGVuZCBvZiBlbHNlIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgIH0gLy8gZW5kIG9mIHNjcm9sbGluZyBkb3duXG5cbiAgICBwcmV2aW91c1Njcm9sbCA9IGN1cnJlbnRTY3JvbGw7XG5cbn1cblxuYXBwLnNjcm9sbEVmZmVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2Nyb2xsaW5nID0gdHJ1ZSkge1xuICAgICAgICAgICAgc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBhcHAuYXBwZWFyT25TY3JvbGwoKTtcbiAgICAgICAgICAgIGFwcC5zY3JvbGxVcE5hdigpO1xuICAgICAgICB9IC8vIGVuZCBvZiBpZiBzY3JvbGxpbmdcbiAgICB9LCAyNTApIC8vIGVuZCBvZiBpbnRlcnZhbFxufTtcblxuXG4vLyBtYWtpbmcgJ21vdmUgbGF1Z2ggcGxheScgYW5pbWF0ZWRcbmFwcC5oZWFkZXJUZXh0RWZmZWN0ID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICQoJy5tb3ZlJykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCAyMDApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkKCcubGF1Z2gnKS5hZGRDbGFzcygnaGVhZGVyVGV4dEVmZmVjdCcpO1xuICAgIH0sIDMwMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoJy5wbGF5JykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCA0MDApO1xufVxuXG4vLyB0byB2aWV3IGRpZmZlcmVudCB0ZWFtIG1lbWJlcnMgXG5hcHAudmlld1RlYW0gPSBmdW5jdGlvbigpIHtcbiAgICAkKCcudGVhbUltYWdlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLnNob3dUZWFtJykuYWRkQ2xhc3MoJ2ZhZGUnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCcuc2hvd1RlYW0nKS5yZW1vdmVDbGFzcygnc2hvd1RlYW0nKTtcbiAgICAgICAgfSwgMjAwKVxuXG4gICAgICAgIC8vIGhpZGUgb3ZlcmxheSBvbiBzZWxlY3RlZCBpdGVtXG4gICAgICAgICQoJy5oaWRlT3ZlcmxheScpLnJlbW92ZUNsYXNzKCdoaWRlT3ZlcmxheScpO1xuXG4gICAgICAgIGxldCByZW1vdmVPdmVybGF5ID0gJCh0aGlzKS5maW5kKCcuaW1hZ2VPdmVybGF5Jyk7XG4gICAgICAgICQocmVtb3ZlT3ZlcmxheSkuYWRkQ2xhc3MoJ2hpZGVPdmVybGF5Jyk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgYmlvIG9mIHRoZSBzZWxlY3RlZCBwZXJzb25cbiAgICAgICAgbGV0IGNsaWNrZWRQZXJzb24gPSAkKHRoaXMpLmRhdGEoJ3NyYycpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG9wZW5Qcm9maWxlID0gJCgnLmFib3V0Q29udGVudCcpLmZpbmQoJy5hYm91dEJsb2NrJyk7XG5cbiAgICAgICAgJC5lYWNoKG9wZW5Qcm9maWxlLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG5cbiAgICAgICAgICAgIGxldCBuYW1lID0gKCQodmFsdWUpLmF0dHIoJ2RhdGEtc3JjJykpO1xuXG4gICAgICAgICAgICBpZiAoY2xpY2tlZFBlcnNvbiA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICQodmFsdWUpLmFkZENsYXNzKCdmYWRlJylcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2hvd1RlYW0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCgnLnNob3dUZWFtJykub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgICAgIH0sIDYwMCwgJ3N3aW5nJyk7XG4gICAgICAgICAgICAgICAgfSwyMDApXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9Ly8gZW5kIG9mIHRlcm5hcnkgb3BlcmF0b3IgXG4gICAgICAgIH0pLy8gZW5kIG9mIGxvb3BcbiAgICB9KS8vIGVuZCBvZiBldmVudFxufVxuXG5hcHAubmF2QnV0dG9uID0gKCkgPT4ge1xuICAgICQoJy5vdmVybGF5QnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBvdmVybGF5U2hvd2luZyA9ICQoJy5tb2JpbGVOYXYnKS5oYXNDbGFzcygnbW9iaWxlTmF2U2hvdycpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBuYXYgaXNuJ3Qgb3BlbmVkIHlldFxuICAgICAgICBpZighb3ZlcmxheVNob3dpbmcpIHtcbiAgICAgICAgICAgICQoJy5tb2JpbGVOYXYnKS5hZGRDbGFzcygnbW9iaWxlTmF2U2hvdycpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXlCdXR0b24nKS5hZGRDbGFzcygnY2xvc2VOYXZPdmVybGF5Jyk7XG5cbiAgICAgICAgLy9pZiBuYXYgaXMgb3BlbmVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcubW9iaWxlTmF2JykucmVtb3ZlQ2xhc3MoJ21vYmlsZU5hdlNob3cnKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5QnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Nsb3NlTmF2T3ZlcmxheScpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gLy8gZW5kIG9mIGlmXG4gICAgfSkvLyBlbmQgb2YgZXZlbnRcbn1cblxuYXBwLm5hdkFjdGlvbiA9ICgpID0+IHtcbiAgICAkKCcubmF2TGlua01vYmlsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJy5tb2JpbGVOYXYnKS5yZW1vdmVDbGFzcygnbW9iaWxlTmF2U2hvdycpO1xuICAgICAgICAkKCcub3ZlcmxheUJ1dHRvbicpLnJlbW92ZUNsYXNzKCdjbG9zZU5hdk92ZXJsYXknKTtcbiAgICB9KVxufVxuXG5hcHAuaW5pdCA9ICgpID0+IHtcbiAgICBhcHAuc3VibWl0Rm9ybSgpO1xuICAgIGFwcC5zY3JvbGxpbmdFdmVudCgpO1xuICAgIGFwcC5oZWFkZXJUZXh0RWZmZWN0KCk7XG4gICAgYXBwLnNjcm9sbEVmZmVjdHMoKTtcbiAgICBhcHAudmlld1RlYW0oKTtcbiAgICBhcHAubmF2QnV0dG9uKCk7XG4gICAgYXBwLm5hdkFjdGlvbigpO1xufVxuXG4kKGZ1bmN0aW9uKCl7XG4gICAgYXBwLmluaXQoKVxufSlcblxuICAgICAgICBcblxuICAgICAgICBcbiBcbiJdfQ==
