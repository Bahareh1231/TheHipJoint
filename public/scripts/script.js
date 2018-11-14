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
            $('.headerNav').removeClass('navGone');
        }

        // header is not in view
        else {
                $('.navLink').addClass('navLinkScrollUp');
                $('.headerList').removeClass('navGone');
                $('.headerNav').removeClass('navGone');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksWUFBWSxLQUFoQjs7QUFFQSxJQUFJLGlCQUFpQixDQUFyQjs7QUFFQTs7QUFFQSxFQUFFLGNBQUYsRUFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBVSxDQUFWLEVBQWE7QUFDdkMsTUFBRSxjQUFGO0FBQ0EsTUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3BCLG1CQUFXLEVBQUUsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBRixFQUF3QixNQUF4QixHQUFpQztBQUR4QixLQUF4QixFQUVHLEdBRkgsRUFFUSxPQUZSO0FBR0gsQ0FMRDs7QUFPQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFJLFVBQUosR0FBaUIsWUFBVztBQUN4QixNQUFFLFdBQUYsRUFBZSxNQUFmLENBQXNCLFVBQVUsQ0FBVixFQUFhO0FBQy9CLFVBQUUsY0FBRjs7QUFFQSxZQUFJLFFBQVEsRUFBRSxJQUFGLENBQVo7QUFDQTtBQUNBLFVBQUUsdUJBQUYsRUFBMkIsS0FBM0IsRUFBa0MsSUFBbEMsQ0FBdUMsWUFBWTtBQUMvQyxnQkFBSSxPQUFPLEVBQUUsSUFBRixDQUFYO0FBQ0EsaUJBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsUUFBbEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsWUFBVixFQUF3QixLQUFLLElBQUwsRUFBeEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsYUFBVjtBQUNILFNBTEQ7QUFNQTs7QUFFQSxVQUFFLElBQUYsQ0FBTztBQUNILGtCQUFNLE1BREg7QUFFSCxpQkFBSyxhQUZGO0FBR0gsa0JBQU0sTUFBTSxTQUFOLEVBSEg7QUFJSCxxQkFBUyxvQkFKTjtBQUtILHNCQUFVO0FBTFAsU0FBUDtBQVFILEtBckJEO0FBdUJILENBeEJEOztBQTBCQSxJQUFJ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QWxCbUMsQ0FrQ2pDO0FBQ0wsS0FuQ0QsRUFEc0IsQ0FvQ3BCO0FBQ0wsQ0FyQ0Q7O0FBdUNBLElBQUksSUFBSixHQUFXLFlBQU07QUFDYixRQUFJLFVBQUo7QUFDQSxRQUFJLGNBQUo7QUFDQSxRQUFJLGdCQUFKO0FBQ0EsUUFBSSxhQUFKO0FBQ0EsUUFBSSxRQUFKO0FBQ0gsQ0FORDs7QUFRQSxFQUFFLFlBQVU7QUFDUixRQUFJLElBQUo7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibGV0IHNjcm9sbGluZyA9IGZhbHNlO1xuXG5sZXQgcHJldmlvdXNTY3JvbGwgPSAwO1xuXG4vL3Ntb290aCBzY3JvbGxpbmdcblxuJCgnYVtocmVmKj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wXG4gICAgfSwgNjAwLCAnc3dpbmcnKTtcbn0pO1xuXG5jb25zdCBhcHAgPSB7fVxuXG5hcHAuc3VibWl0Rm9ybSA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNmb3JtQm9keScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgLy9zaG93IHNvbWUgcmVzcG9uc2Ugb24gdGhlIGJ1dHRvblxuICAgICAgICAkKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScsICRmb3JtKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgICAgICRidG4ucHJvcCgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgICAgICRidG4ucHJvcCgnb3JpZ19sYWJlbCcsICRidG4udGV4dCgpKTtcbiAgICAgICAgICAgICRidG4udGV4dCgnU2VuZGluZyAuLi4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFmdGVyX2Zvcm1fc3VibWl0dGVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiAnaGFuZGxlci5waHAnLFxuICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICBzdWNjZXNzOiBhZnRlcl9mb3JtX3N1Ym1pdHRlZCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTidcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbiAgICBcbn1cblxubGV0IGFmdGVyX2Zvcm1fc3VibWl0dGVkID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBcbiAgICAvLyBpZiAoZGF0YS5yZXN1bHQgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgLy8gICAgICQoJ2Zvcm0jcmV1c2VkX2Zvcm0nKS5oaWRlKCk7XG4gICAgLy8gICAgICQoJyNzdWNjZXNzX21lc3NhZ2UnKS5zaG93KCk7XG4gICAgLy8gICAgICQoJyNlcnJvcl9tZXNzYWdlJykuaGlkZSgpO1xuICAgIC8vIH1cbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5hcHBlbmQoJzx1bD48L3VsPicpO1xuXG4gICAgLy8gICAgIGpRdWVyeS5lYWNoKGRhdGEuZXJyb3JzLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICAvLyAgICAgICAgICQoJyNlcnJvcl9tZXNzYWdlIHVsJykuYXBwZW5kKCc8bGk+JyArIGtleSArICc6JyArIHZhbCArICc8L2xpPicpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgJCgnI3N1Y2Nlc3NfbWVzc2FnZScpLmhpZGUoKTtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5zaG93KCk7XG5cbiAgICAvLyAgICAgLy9yZXZlcnNlIHRoZSByZXNwb25zZSBvbiB0aGUgYnV0dG9uXG4gICAgLy8gICAgICQoJ2J1dHRvblt0eXBlPVwiYnV0dG9uXCJdJywgJGZvcm0pLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICAgICAgJGJ0biA9ICQodGhpcyk7XG4gICAgLy8gICAgICAgICBsYWJlbCA9ICRidG4ucHJvcCgnb3JpZ19sYWJlbCcpO1xuICAgIC8vICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi5wcm9wKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgIC8vICAgICAgICAgICAgICRidG4udGV4dChsYWJlbCk7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi5wcm9wKCdvcmlnX2xhYmVsJywgJycpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9Ly8gZW5kIG9mIGVsc2Vcbn1cblxuXG4vLyBzY3JvbGwgZXZlbnQgXG5hcHAuc2Nyb2xsaW5nRXZlbnQgPSAoKSA9PiB7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjcm9sbGluZyA9IHRydWU7XG5cbiAgICB9KVxufVxuXG5hcHAuc2Nyb2xsVXBOYXYgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBsZXQgaGVhZGVyVG9wID0gJChcImhlYWRlclwiKS5vZmZzZXQoKS50b3A7XG4gICAgbGV0IGhlYWRlckJvdHRvbSA9ICQoXCJoZWFkZXJcIikub2Zmc2V0KCkudG9wICsgJChcImhlYWRlclwiKS5vdXRlckhlaWdodCgpO1xuICAgIGxldCBzY3JlZW5Cb3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgbGV0IHNjcmVlblRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgIGxldCBjdXJyZW50U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy9zY3JvbGxpbmcgdXAgXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPCBwcmV2aW91c1Njcm9sbCkge1xuICAgICAgICAvL2FuZCBoZWFkZXIgaXMgaW4gdmlld1xuICAgICAgICBpZiAoc2NyZWVuQm90dG9tID4gaGVhZGVyVG9wICYmIHNjcmVlblRvcCA8IGhlYWRlckJvdHRvbSkge1xuICAgICAgICAgICAgJCgnLmxvZ28nKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLm5hdkxpbmsnKS5yZW1vdmVDbGFzcygnbmF2TGlua1Njcm9sbFVwJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTmF2JykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5uYXZMaW5rJykuYWRkQ2xhc3MoJ25hdkxpbmtTY3JvbGxVcCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlck5hdicpLnJlbW92ZUNsYXNzKCduYXZHb25lJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL3Njcm9sbGluZyBkb3duXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPiBwcmV2aW91c1Njcm9sbCkge1xuICAgICAgICAvLyBoZWFkZXIgaXMgaW4gdmlld1xuICAgICAgICBpZiAoKHNjcmVlbkJvdHRvbSA+IGhlYWRlclRvcCkgJiYgKHNjcmVlblRvcCA8IGhlYWRlckJvdHRvbSkpIHtcbiAgICAgICAgICAgICQoJy5sb2dvJykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5sb2dvJykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgICQoJy5uYXZMaW5rJykucmVtb3ZlQ2xhc3MoJ25hdkxpbmtTY3JvbGxVcCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5hZGRDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlck5hdicpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgIH0vLyBlbmQgb2YgZWxzZSBoZWFkZXIgaXMgbm90IGluIHZpZXdcbiAgICB9IC8vIGVuZCBvZiBzY3JvbGxpbmcgZG93blxuXG4gICAgcHJldmlvdXNTY3JvbGwgPSBjdXJyZW50U2Nyb2xsO1xuXG59XG5cbmFwcC5zY3JvbGxFZmZlY3RzID0gZnVuY3Rpb24gKCkge1xuICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNjcm9sbGluZyA9IHRydWUpIHtcbiAgICAgICAgICAgIHNjcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gYXBwLmFwcGVhck9uU2Nyb2xsKCk7XG4gICAgICAgICAgICBhcHAuc2Nyb2xsVXBOYXYoKTtcbiAgICAgICAgfSAvLyBlbmQgb2YgaWYgc2Nyb2xsaW5nXG4gICAgfSwgMjUwKSAvLyBlbmQgb2YgaW50ZXJ2YWxcbn07XG5cblxuLy8gbWFraW5nICdtb3ZlIGxhdWdoIHBsYXknIGFuaW1hdGVkXG5hcHAuaGVhZGVyVGV4dEVmZmVjdCA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAkKCcubW92ZScpLmFkZENsYXNzKCdoZWFkZXJUZXh0RWZmZWN0Jyk7XG4gICAgfSwgMjAwKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgJCgnLmxhdWdoJykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCAzMDApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkKCcucGxheScpLmFkZENsYXNzKCdoZWFkZXJUZXh0RWZmZWN0Jyk7XG4gICAgfSwgNDAwKTtcbn1cblxuLy8gdG8gdmlldyBkaWZmZXJlbnQgdGVhbSBtZW1iZXJzIFxuYXBwLnZpZXdUZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnLnRlYW1JbWFnZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5zaG93VGVhbScpLmFkZENsYXNzKCdmYWRlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnNob3dUZWFtJykucmVtb3ZlQ2xhc3MoJ3Nob3dUZWFtJyk7XG4gICAgICAgIH0sIDIwMClcblxuICAgICAgICAvLyBoaWRlIG92ZXJsYXkgb24gc2VsZWN0ZWQgaXRlbVxuICAgICAgICAkKCcuaGlkZU92ZXJsYXknKS5yZW1vdmVDbGFzcygnaGlkZU92ZXJsYXknKTtcblxuICAgICAgICBsZXQgcmVtb3ZlT3ZlcmxheSA9ICQodGhpcykuZmluZCgnLmltYWdlT3ZlcmxheScpO1xuICAgICAgICAkKHJlbW92ZU92ZXJsYXkpLmFkZENsYXNzKCdoaWRlT3ZlcmxheScpO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIGJpbyBvZiB0aGUgc2VsZWN0ZWQgcGVyc29uXG4gICAgICAgIGxldCBjbGlja2VkUGVyc29uID0gJCh0aGlzKS5kYXRhKCdzcmMnKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBvcGVuUHJvZmlsZSA9ICQoJy5hYm91dENvbnRlbnQnKS5maW5kKCcuYWJvdXRCbG9jaycpO1xuXG4gICAgICAgICQuZWFjaChvcGVuUHJvZmlsZSwgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICgkKHZhbHVlKS5hdHRyKCdkYXRhLXNyYycpKTtcblxuICAgICAgICAgICAgaWYgKGNsaWNrZWRQZXJzb24gPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAkKHZhbHVlKS5hZGRDbGFzcygnZmFkZScpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3Nob3dUZWFtJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmFkZScpO1xuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoJy5zaG93VGVhbScpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICAgICAgICB9LCA2MDAsICdzd2luZycpO1xuICAgICAgICAgICAgICAgIH0sMjAwKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfS8vIGVuZCBvZiB0ZXJuYXJ5IG9wZXJhdG9yIFxuICAgICAgICB9KS8vIGVuZCBvZiBsb29wXG4gICAgfSkvLyBlbmQgb2YgZXZlbnRcbn1cblxuYXBwLmluaXQgPSAoKSA9PiB7XG4gICAgYXBwLnN1Ym1pdEZvcm0oKTtcbiAgICBhcHAuc2Nyb2xsaW5nRXZlbnQoKTtcbiAgICBhcHAuaGVhZGVyVGV4dEVmZmVjdCgpO1xuICAgIGFwcC5zY3JvbGxFZmZlY3RzKCk7XG4gICAgYXBwLnZpZXdUZWFtKCk7XG59XG5cbiQoZnVuY3Rpb24oKXtcbiAgICBhcHAuaW5pdCgpXG59KVxuXG4gICAgICAgIFxuXG4gICAgICAgIFxuIFxuIl19
