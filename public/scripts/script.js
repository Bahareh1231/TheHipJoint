(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var scrolling = false;

var previousScroll = 0;

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
        }

        // header is not in view
        else {
                $('.navLink').addClass('navLinkScrollUp');
                $('.headerList').removeClass('navGone');
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

app.init = function () {
    app.submitForm();
    app.scrollingEvent();
    app.headerTextEffect();
    app.scrollEffects();
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksWUFBWSxLQUFoQjs7QUFFQSxJQUFJLGlCQUFpQixDQUFyQjs7QUFFQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFJLFVBQUosR0FBaUIsWUFBVztBQUN4QixNQUFFLFdBQUYsRUFBZSxNQUFmLENBQXNCLFVBQVUsQ0FBVixFQUFhO0FBQy9CLFVBQUUsY0FBRjs7QUFFQSxZQUFJLFFBQVEsRUFBRSxJQUFGLENBQVo7QUFDQTtBQUNBLFVBQUUsdUJBQUYsRUFBMkIsS0FBM0IsRUFBa0MsSUFBbEMsQ0FBdUMsWUFBWTtBQUMvQyxnQkFBSSxPQUFPLEVBQUUsSUFBRixDQUFYO0FBQ0EsaUJBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsUUFBbEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsWUFBVixFQUF3QixLQUFLLElBQUwsRUFBeEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsYUFBVjtBQUNILFNBTEQ7QUFNQTs7QUFFQSxVQUFFLElBQUYsQ0FBTztBQUNILGtCQUFNLE1BREg7QUFFSCxpQkFBSyxhQUZGO0FBR0gsa0JBQU0sTUFBTSxTQUFOLEVBSEg7QUFJSCxxQkFBUyxvQkFKTjtBQUtILHNCQUFVO0FBTFAsU0FBUDtBQVFILEtBckJEO0FBdUJILENBeEJEOztBQTBCQSxJQUFJLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBVSxJQUFWLEVBQWdCO0FBQ3ZDLFlBQVEsR0FBUixDQUFZLElBQVo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsQ0E1QkQ7O0FBK0JBO0FBQ0EsSUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDdkIsTUFBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFZO0FBQ3pCLG9CQUFZLElBQVo7QUFFSCxLQUhEO0FBSUgsQ0FMRDs7QUFPQSxJQUFJLFdBQUosR0FBa0IsWUFBWTs7QUFFMUIsUUFBSSxZQUFZLEVBQUUsUUFBRixFQUFZLE1BQVosR0FBcUIsR0FBckM7QUFDQSxRQUFJLGVBQWUsRUFBRSxRQUFGLEVBQVksTUFBWixHQUFxQixHQUFyQixHQUEyQixFQUFFLFFBQUYsRUFBWSxXQUFaLEVBQTlDO0FBQ0EsUUFBSSxlQUFlLEVBQUUsTUFBRixFQUFVLFNBQVYsS0FBd0IsT0FBTyxXQUFsRDtBQUNBLFFBQUksWUFBWSxFQUFFLE1BQUYsRUFBVSxTQUFWLEVBQWhCOztBQUVBLFFBQUksZ0JBQWdCLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBcEI7O0FBRUE7QUFDQSxRQUFJLGdCQUFnQixjQUFwQixFQUFvQztBQUNoQztBQUNBLFlBQUksZUFBZSxTQUFmLElBQTRCLFlBQVksWUFBNUMsRUFBMEQ7QUFDdEQsY0FBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixTQUF2QjtBQUNBLGNBQUUsYUFBRixFQUFpQixXQUFqQixDQUE2QixTQUE3QjtBQUNBLGNBQUUsVUFBRixFQUFjLFdBQWQsQ0FBMEIsaUJBQTFCO0FBQ0g7O0FBRUQ7QUFOQSxhQU9LO0FBQ0Qsa0JBQUUsVUFBRixFQUFjLFFBQWQsQ0FBdUIsaUJBQXZCO0FBQ0Esa0JBQUUsYUFBRixFQUFpQixXQUFqQixDQUE2QixTQUE3QjtBQUVIO0FBQ0o7O0FBRUQ7QUFDQSxRQUFJLGdCQUFnQixjQUFwQixFQUFvQztBQUNoQztBQUNBLFlBQUssZUFBZSxTQUFoQixJQUErQixZQUFZLFlBQS9DLEVBQThEO0FBQzFELGNBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IsU0FBcEI7QUFDQSxjQUFFLGFBQUYsRUFBaUIsUUFBakIsQ0FBMEIsU0FBMUI7QUFDSDs7QUFFRDtBQUxBLGFBTUs7QUFDRCxrQkFBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQixTQUFwQjtBQUNBLGtCQUFFLFVBQUYsRUFBYyxXQUFkLENBQTBCLGlCQUExQjtBQUNBLGtCQUFFLGFBQUYsRUFBaUIsUUFBakIsQ0FBMEIsU0FBMUI7QUFDSCxhQVorQixDQVkvQjtBQUNKLEtBeEN5QixDQXdDeEI7O0FBRUYscUJBQWlCLGFBQWpCO0FBRUgsQ0E1Q0Q7O0FBOENBLElBQUksYUFBSixHQUFvQixZQUFZO0FBQzVCLGdCQUFZLFlBQVk7QUFDcEIsWUFBSSxZQUFZLElBQWhCLEVBQXNCO0FBQ2xCLHdCQUFZLEtBQVo7QUFDQTtBQUNBLGdCQUFJLFdBQUo7QUFDSCxTQUxtQixDQUtsQjtBQUNMLEtBTkQsRUFNRyxHQU5ILEVBRDRCLENBT3BCO0FBQ1gsQ0FSRDs7QUFXQTtBQUNBLElBQUksZ0JBQUosR0FBdUIsWUFBTTtBQUN6QixlQUFXLFlBQUs7QUFDWixVQUFFLE9BQUYsRUFBVyxRQUFYLENBQW9CLGtCQUFwQjtBQUNILEtBRkQsRUFFRyxHQUZIO0FBR0EsZUFBVyxZQUFNO0FBQ2IsVUFBRSxRQUFGLEVBQVksUUFBWixDQUFxQixrQkFBckI7QUFDSCxLQUZELEVBRUcsR0FGSDtBQUdBLGVBQVcsWUFBTTtBQUNiLFVBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0Isa0JBQXBCO0FBQ0gsS0FGRCxFQUVHLEdBRkg7QUFHSCxDQVZEOztBQVlBLElBQUksSUFBSixHQUFXLFlBQU07QUFDYixRQUFJLFVBQUo7QUFDQSxRQUFJLGNBQUo7QUFDQSxRQUFJLGdCQUFKO0FBQ0EsUUFBSSxhQUFKO0FBQ0gsQ0FMRDs7QUFPQSxFQUFFLFlBQVU7QUFDUixRQUFJLElBQUo7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibGV0IHNjcm9sbGluZyA9IGZhbHNlO1xuXG5sZXQgcHJldmlvdXNTY3JvbGwgPSAwO1xuXG5jb25zdCBhcHAgPSB7fVxuXG5hcHAuc3VibWl0Rm9ybSA9IGZ1bmN0aW9uKCkge1xuICAgICQoJyNmb3JtQm9keScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgLy9zaG93IHNvbWUgcmVzcG9uc2Ugb24gdGhlIGJ1dHRvblxuICAgICAgICAkKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScsICRmb3JtKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgICAgICRidG4ucHJvcCgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgICAgICRidG4ucHJvcCgnb3JpZ19sYWJlbCcsICRidG4udGV4dCgpKTtcbiAgICAgICAgICAgICRidG4udGV4dCgnU2VuZGluZyAuLi4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFmdGVyX2Zvcm1fc3VibWl0dGVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiAnaGFuZGxlci5waHAnLFxuICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICBzdWNjZXNzOiBhZnRlcl9mb3JtX3N1Ym1pdHRlZCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTidcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbiAgICBcbn1cblxubGV0IGFmdGVyX2Zvcm1fc3VibWl0dGVkID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBcbiAgICAvLyBpZiAoZGF0YS5yZXN1bHQgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgLy8gICAgICQoJ2Zvcm0jcmV1c2VkX2Zvcm0nKS5oaWRlKCk7XG4gICAgLy8gICAgICQoJyNzdWNjZXNzX21lc3NhZ2UnKS5zaG93KCk7XG4gICAgLy8gICAgICQoJyNlcnJvcl9tZXNzYWdlJykuaGlkZSgpO1xuICAgIC8vIH1cbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5hcHBlbmQoJzx1bD48L3VsPicpO1xuXG4gICAgLy8gICAgIGpRdWVyeS5lYWNoKGRhdGEuZXJyb3JzLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICAvLyAgICAgICAgICQoJyNlcnJvcl9tZXNzYWdlIHVsJykuYXBwZW5kKCc8bGk+JyArIGtleSArICc6JyArIHZhbCArICc8L2xpPicpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgJCgnI3N1Y2Nlc3NfbWVzc2FnZScpLmhpZGUoKTtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5zaG93KCk7XG5cbiAgICAvLyAgICAgLy9yZXZlcnNlIHRoZSByZXNwb25zZSBvbiB0aGUgYnV0dG9uXG4gICAgLy8gICAgICQoJ2J1dHRvblt0eXBlPVwiYnV0dG9uXCJdJywgJGZvcm0pLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICAgICAgJGJ0biA9ICQodGhpcyk7XG4gICAgLy8gICAgICAgICBsYWJlbCA9ICRidG4ucHJvcCgnb3JpZ19sYWJlbCcpO1xuICAgIC8vICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi5wcm9wKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgIC8vICAgICAgICAgICAgICRidG4udGV4dChsYWJlbCk7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi5wcm9wKCdvcmlnX2xhYmVsJywgJycpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9Ly8gZW5kIG9mIGVsc2Vcbn1cblxuXG4vLyBzY3JvbGwgZXZlbnQgXG5hcHAuc2Nyb2xsaW5nRXZlbnQgPSAoKSA9PiB7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjcm9sbGluZyA9IHRydWU7XG5cbiAgICB9KVxufVxuXG5hcHAuc2Nyb2xsVXBOYXYgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBsZXQgaGVhZGVyVG9wID0gJChcImhlYWRlclwiKS5vZmZzZXQoKS50b3A7XG4gICAgbGV0IGhlYWRlckJvdHRvbSA9ICQoXCJoZWFkZXJcIikub2Zmc2V0KCkudG9wICsgJChcImhlYWRlclwiKS5vdXRlckhlaWdodCgpO1xuICAgIGxldCBzY3JlZW5Cb3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgbGV0IHNjcmVlblRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgIGxldCBjdXJyZW50U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy9zY3JvbGxpbmcgdXAgXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPCBwcmV2aW91c1Njcm9sbCkge1xuICAgICAgICAvL2FuZCBoZWFkZXIgaXMgaW4gdmlld1xuICAgICAgICBpZiAoc2NyZWVuQm90dG9tID4gaGVhZGVyVG9wICYmIHNjcmVlblRvcCA8IGhlYWRlckJvdHRvbSkge1xuICAgICAgICAgICAgJCgnLmxvZ28nKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlckxpc3QnKS5yZW1vdmVDbGFzcygnbmF2R29uZScpO1xuICAgICAgICAgICAgJCgnLm5hdkxpbmsnKS5yZW1vdmVDbGFzcygnbmF2TGlua1Njcm9sbFVwJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoZWFkZXIgaXMgbm90IGluIHZpZXdcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcubmF2TGluaycpLmFkZENsYXNzKCduYXZMaW5rU2Nyb2xsVXAnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykucmVtb3ZlQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9zY3JvbGxpbmcgZG93blxuICAgIGlmIChjdXJyZW50U2Nyb2xsID4gcHJldmlvdXNTY3JvbGwpIHtcbiAgICAgICAgLy8gaGVhZGVyIGlzIGluIHZpZXdcbiAgICAgICAgaWYgKChzY3JlZW5Cb3R0b20gPiBoZWFkZXJUb3ApICYmIChzY3JlZW5Ub3AgPCBoZWFkZXJCb3R0b20pKSB7XG4gICAgICAgICAgICAkKCcubG9nbycpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyTGlzdCcpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoZWFkZXIgaXMgbm90IGluIHZpZXdcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcubG9nbycpLmFkZENsYXNzKCduYXZHb25lJyk7XG4gICAgICAgICAgICAkKCcubmF2TGluaycpLnJlbW92ZUNsYXNzKCduYXZMaW5rU2Nyb2xsVXAnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXJMaXN0JykuYWRkQ2xhc3MoJ25hdkdvbmUnKTtcbiAgICAgICAgfS8vIGVuZCBvZiBlbHNlIGhlYWRlciBpcyBub3QgaW4gdmlld1xuICAgIH0gLy8gZW5kIG9mIHNjcm9sbGluZyBkb3duXG5cbiAgICBwcmV2aW91c1Njcm9sbCA9IGN1cnJlbnRTY3JvbGw7XG5cbn1cblxuYXBwLnNjcm9sbEVmZmVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2Nyb2xsaW5nID0gdHJ1ZSkge1xuICAgICAgICAgICAgc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBhcHAuYXBwZWFyT25TY3JvbGwoKTtcbiAgICAgICAgICAgIGFwcC5zY3JvbGxVcE5hdigpO1xuICAgICAgICB9IC8vIGVuZCBvZiBpZiBzY3JvbGxpbmdcbiAgICB9LCAyNTApIC8vIGVuZCBvZiBpbnRlcnZhbFxufTtcblxuXG4vLyBtYWtpbmcgJ21vdmUgbGF1Z2ggcGxheScgYW5pbWF0ZWRcbmFwcC5oZWFkZXJUZXh0RWZmZWN0ID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICQoJy5tb3ZlJykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCAyMDApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkKCcubGF1Z2gnKS5hZGRDbGFzcygnaGVhZGVyVGV4dEVmZmVjdCcpO1xuICAgIH0sIDMwMCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoJy5wbGF5JykuYWRkQ2xhc3MoJ2hlYWRlclRleHRFZmZlY3QnKTtcbiAgICB9LCA0MDApO1xufVxuXG5hcHAuaW5pdCA9ICgpID0+IHtcbiAgICBhcHAuc3VibWl0Rm9ybSgpO1xuICAgIGFwcC5zY3JvbGxpbmdFdmVudCgpO1xuICAgIGFwcC5oZWFkZXJUZXh0RWZmZWN0KCk7XG4gICAgYXBwLnNjcm9sbEVmZmVjdHMoKTtcbn1cblxuJChmdW5jdGlvbigpe1xuICAgIGFwcC5pbml0KClcbn0pXG5cbiAgICAgICAgXG5cbiAgICAgICAgXG4gXG4iXX0=
