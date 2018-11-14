(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var scrolling = false;

var previousScroll = 0;

//smooth scrolling

$('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 600, 'swing');
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
        }

        // header is not in view
        else {
                $('.navLink').addClass('navLinkScrollUp');
                $('.headerList').removeClass('navGone');
                $('.headerNav').removeClass('navGone').addClass('navOverlay');
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

app.init = function () {
    app.submitForm();
    app.scrollingEvent();
    app.headerTextEffect();
    app.scrollEffects();
    app.viewTeam();
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksWUFBWSxLQUFoQjs7QUFFQSxJQUFJLGlCQUFpQixDQUFyQjs7QUFFQTs7QUFFQSxFQUFFLGNBQUYsRUFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBVSxDQUFWLEVBQWE7QUFDdkMsTUFBRSxjQUFGO0FBQ0EsTUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3BCLG1CQUFXLEVBQUUsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBRixFQUF3QixNQUF4QixHQUFpQztBQUR4QixLQUF4QixFQUVHLEdBRkgsRUFFUSxPQUZSO0FBR0gsQ0FMRDs7QUFPQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFJLFVBQUosR0FBaUIsWUFBVztBQUN4QixNQUFFLFdBQUYsRUFBZSxNQUFmLENBQXNCLFVBQVUsQ0FBVixFQUFhO0FBQy9CLFVBQUUsY0FBRjs7QUFFQSxZQUFJLFFBQVEsRUFBRSxJQUFGLENBQVo7QUFDQTtBQUNBLFVBQUUsdUJBQUYsRUFBMkIsS0FBM0IsRUFBa0MsSUFBbEMsQ0FBdUMsWUFBWTtBQUMvQyxnQkFBSSxPQUFPLEVBQUUsSUFBRixDQUFYO0FBQ0EsaUJBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsUUFBbEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsWUFBVixFQUF3QixLQUFLLElBQUwsRUFBeEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsYUFBVjtBQUNILFNBTEQ7QUFNQTs7QUFFQSxVQUFFLElBQUYsQ0FBTztBQUNILGtCQUFNLE1BREg7QUFFSCxpQkFBSyxhQUZGO0FBR0gsa0JBQU0sTUFBTSxTQUFOLEVBSEg7QUFJSCxxQkFBUyxvQkFKTjtBQUtILHNCQUFVO0FBTFAsU0FBUDtBQVFILEtBckJEO0FBdUJILENBeEJEOztBQTBCQSxJQUFJ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LENBZXZDO0FBQ0osU0FoQkQsRUFsQm1DLENBa0NqQztBQUNMLEtBbkNELEVBRHNCLENBb0NwQjtBQUNMLENBckNEOztBQXVDQSxJQUFJLElBQUosR0FBVyxZQUFNO0FBQ2IsUUFBSSxVQUFKO0FBQ0EsUUFBSSxjQUFKO0FBQ0EsUUFBSSxnQkFBSjtBQUNBLFFBQUksYUFBSjtBQUNBLFFBQUksUUFBSjtBQUNILENBTkQ7O0FBUUEsRUFBRSxZQUFVO0FBQ1IsUUFBSSxJQUFKO0FBQ0gsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCBzY3JvbGxpbmcgPSBmYWxzZTtcblxubGV0IHByZXZpb3VzU2Nyb2xsID0gMDtcblxuLy9zbW9vdGggc2Nyb2xsaW5nXG5cbiQoJ2FbaHJlZio9XCIjXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICQoJCh0aGlzKS5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcFxuICAgIH0sIDYwMCwgJ3N3aW5nJyk7XG59KTtcblxuY29uc3QgYXBwID0ge31cblxuYXBwLnN1Ym1pdEZvcm0gPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjZm9ybUJvZHknKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCAkZm9ybSA9ICQodGhpcyk7XG4gICAgICAgIC8vc2hvdyBzb21lIHJlc3BvbnNlIG9uIHRoZSBidXR0b25cbiAgICAgICAgJCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nLCAkZm9ybSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgJGJ0biA9ICQodGhpcyk7XG4gICAgICAgICAgICAkYnRuLnByb3AoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICAkYnRuLnByb3AoJ29yaWdfbGFiZWwnLCAkYnRuLnRleHQoKSk7XG4gICAgICAgICAgICAkYnRuLnRleHQoJ1NlbmRpbmcgLi4uJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBhZnRlcl9mb3JtX3N1Ym1pdHRlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogJ2hhbmRsZXIucGhwJyxcbiAgICAgICAgICAgIGRhdGE6ICRmb3JtLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgc3VjY2VzczogYWZ0ZXJfZm9ybV9zdWJtaXR0ZWQsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG4gICAgXG59XG5cbmxldCBhZnRlcl9mb3JtX3N1Ym1pdHRlZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgXG4gICAgLy8gaWYgKGRhdGEucmVzdWx0ID09ICdzdWNjZXNzJykge1xuICAgIC8vICAgICAkKCdmb3JtI3JldXNlZF9mb3JtJykuaGlkZSgpO1xuICAgIC8vICAgICAkKCcjc3VjY2Vzc19tZXNzYWdlJykuc2hvdygpO1xuICAgIC8vICAgICAkKCcjZXJyb3JfbWVzc2FnZScpLmhpZGUoKTtcbiAgICAvLyB9XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICAgICQoJyNlcnJvcl9tZXNzYWdlJykuYXBwZW5kKCc8dWw+PC91bD4nKTtcblxuICAgIC8vICAgICBqUXVlcnkuZWFjaChkYXRhLmVycm9ycywgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgLy8gICAgICAgICAkKCcjZXJyb3JfbWVzc2FnZSB1bCcpLmFwcGVuZCgnPGxpPicgKyBrZXkgKyAnOicgKyB2YWwgKyAnPC9saT4nKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgICQoJyNzdWNjZXNzX21lc3NhZ2UnKS5oaWRlKCk7XG4gICAgLy8gICAgICQoJyNlcnJvcl9tZXNzYWdlJykuc2hvdygpO1xuXG4gICAgLy8gICAgIC8vcmV2ZXJzZSB0aGUgcmVzcG9uc2Ugb24gdGhlIGJ1dHRvblxuICAgIC8vICAgICAkKCdidXR0b25bdHlwZT1cImJ1dHRvblwiXScsICRmb3JtKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgICRidG4gPSAkKHRoaXMpO1xuICAgIC8vICAgICAgICAgbGFiZWwgPSAkYnRuLnByb3AoJ29yaWdfbGFiZWwnKTtcbiAgICAvLyAgICAgICAgIGlmIChsYWJlbCkge1xuICAgIC8vICAgICAgICAgICAgICRidG4ucHJvcCgndHlwZScsICdzdWJtaXQnKTtcbiAgICAvLyAgICAgICAgICAgICAkYnRuLnRleHQobGFiZWwpO1xuICAgIC8vICAgICAgICAgICAgICRidG4ucHJvcCgnb3JpZ19sYWJlbCcsICcnKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfS8vIGVuZCBvZiBlbHNlXG59XG5cblxuLy8gc2Nyb2xsIGV2ZW50IFxuYXBwLnNjcm9sbGluZ0V2ZW50ID0gKCkgPT4ge1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICBzY3JvbGxpbmcgPSB0cnVlO1xuXG4gICAgfSlcbn1cblxuYXBwLnNjcm9sbFVwTmF2ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IGhlYWRlclRvcCA9ICQoXCJoZWFkZXJcIikub2Zmc2V0KCkudG9wO1xuICAgIGxldCBoZWFkZXJCb3R0b20gPSAkKFwiaGVhZGVyXCIpLm9mZnNldCgpLnRvcCArICQoXCJoZWFkZXJcIikub3V0ZXJIZWlnaHQoKTtcbiAgICBsZXQgc2NyZWVuQm90dG9tID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGxldCBzY3JlZW5Ub3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICBsZXQgY3VycmVudFNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgIC8vc2Nyb2xsaW5nIHVwIFxuICAgIGlmIChjdXJyZW50U2Nyb2xsIDwgcHJldmlvdXNTY3JvbGwpIHtcbiAgICAgICAgLy9hbmQgaGVhZGVyIGlzIGluIHZpZXdcbiAgICAgICAgaWYgKHNjcmVlbkJvdHRvbSA+IGhlYWRlclRvcCAmJiBzY3JlZW5Ub3AgPCBoZWFkZXJCb3R0b20pIHtcbiAgICAgICAgICAgICQoJy5sb2dvJykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5uYXZMaW5rJykucmVtb3ZlQ2xhc3MoJ25hdkxpbmtTY3JvbGxVcCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlck5hdicpLnJlbW92ZUNsYXNzKCduYXZHb25lIG5hdk92ZXJsYXknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5uYXZMaW5rJykuYWRkQ2xhc3MoJ25hdkxpbmtTY3JvbGxVcCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlck5hdicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCduYXZHb25lJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ25hdk92ZXJsYXknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vc2Nyb2xsaW5nIGRvd25cbiAgICBpZiAoY3VycmVudFNjcm9sbCA+IHByZXZpb3VzU2Nyb2xsKSB7XG4gICAgICAgIC8vIGhlYWRlciBpcyBpbiB2aWV3XG4gICAgICAgIGlmICgoc2NyZWVuQm90dG9tID4gaGVhZGVyVG9wKSAmJiAoc2NyZWVuVG9wIDwgaGVhZGVyQm90dG9tKSkge1xuICAgICAgICAgICAgJCgnLmxvZ28nKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGVhZGVyIGlzIG5vdCBpbiB2aWV3XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmxvZ28nKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLm5hdkxpbmsnKS5yZW1vdmVDbGFzcygnbmF2TGlua1Njcm9sbFVwJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTmF2JykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgfS8vIGVuZCBvZiBlbHNlIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgIH0gLy8gZW5kIG9mIHNjcm9sbGluZyBkb3duXG5cbiAgICBwcmV2aW91c1Njcm9sbCA9IGN1cnJlbnRTY3JvbGw7XG5cbn1cblxuYXBwLnNjcm9sbEVmZmVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2Nyb2xsaW5nID0gdHJ1ZSkge1xuICAgICAgICAgICAgc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBhcHAuYXBwZWFyT25TY3JvbGwoKTtcbiAgICAgICAgICAgIGFwcC5zY3JvbGxVcE5hdigpO1xuICAgICAgICB9IC8vIGVuZCBvZiBpZiBzY3JvbGxpbmdcbiAgICB9LCAyNTApIC8vIGVuZCBvZiBpbnRlcnZhbFxufTtcblxuXG4vLyBtYWtpbmcgJ21vdmUgbGF1Z2ggcGxheScgYW5pbWF0ZWRcbmFwcC5oZWFkZXJUZXh0RWZmZWN0ID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICQoJy5tb3ZlJykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCAyMDApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkKCcubGF1Z2gnKS5hZGRDbGFzcygnaGVhZGVyVGV4dEVmZmVjdCcpO1xuICAgIH0sIDMwMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoJy5wbGF5JykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCA0MDApO1xufVxuXG4vLyB0byB2aWV3IGRpZmZlcmVudCB0ZWFtIG1lbWJlcnMgXG5hcHAudmlld1RlYW0gPSBmdW5jdGlvbigpIHtcbiAgICAkKCcudGVhbUltYWdlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLnNob3dUZWFtJykuYWRkQ2xhc3MoJ2ZhZGUnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCcuc2hvd1RlYW0nKS5yZW1vdmVDbGFzcygnc2hvd1RlYW0nKTtcbiAgICAgICAgfSwgMjAwKVxuXG4gICAgICAgIC8vIGhpZGUgb3ZlcmxheSBvbiBzZWxlY3RlZCBpdGVtXG4gICAgICAgICQoJy5oaWRlT3ZlcmxheScpLnJlbW92ZUNsYXNzKCdoaWRlT3ZlcmxheScpO1xuXG4gICAgICAgIGxldCByZW1vdmVPdmVybGF5ID0gJCh0aGlzKS5maW5kKCcuaW1hZ2VPdmVybGF5Jyk7XG4gICAgICAgICQocmVtb3ZlT3ZlcmxheSkuYWRkQ2xhc3MoJ2hpZGVPdmVybGF5Jyk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgYmlvIG9mIHRoZSBzZWxlY3RlZCBwZXJzb25cbiAgICAgICAgbGV0IGNsaWNrZWRQZXJzb24gPSAkKHRoaXMpLmRhdGEoJ3NyYycpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG9wZW5Qcm9maWxlID0gJCgnLmFib3V0Q29udGVudCcpLmZpbmQoJy5hYm91dEJsb2NrJyk7XG5cbiAgICAgICAgJC5lYWNoKG9wZW5Qcm9maWxlLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG5cbiAgICAgICAgICAgIGxldCBuYW1lID0gKCQodmFsdWUpLmF0dHIoJ2RhdGEtc3JjJykpO1xuXG4gICAgICAgICAgICBpZiAoY2xpY2tlZFBlcnNvbiA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICQodmFsdWUpLmFkZENsYXNzKCdmYWRlJylcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2hvd1RlYW0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCgnLnNob3dUZWFtJykub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgICAgIH0sIDYwMCwgJ3N3aW5nJyk7XG4gICAgICAgICAgICAgICAgfSwyMDApXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9Ly8gZW5kIG9mIHRlcm5hcnkgb3BlcmF0b3IgXG4gICAgICAgIH0pLy8gZW5kIG9mIGxvb3BcbiAgICB9KS8vIGVuZCBvZiBldmVudFxufVxuXG5hcHAuaW5pdCA9ICgpID0+IHtcbiAgICBhcHAuc3VibWl0Rm9ybSgpO1xuICAgIGFwcC5zY3JvbGxpbmdFdmVudCgpO1xuICAgIGFwcC5oZWFkZXJUZXh0RWZmZWN0KCk7XG4gICAgYXBwLnNjcm9sbEVmZmVjdHMoKTtcbiAgICBhcHAudmlld1RlYW0oKTtcbn1cblxuJChmdW5jdGlvbigpe1xuICAgIGFwcC5pbml0KClcbn0pXG5cbiAgICAgICAgXG5cbiAgICAgICAgXG4gXG4iXX0=
