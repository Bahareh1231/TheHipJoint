(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

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

app.init = function () {
    app.submitForm();
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBLElBQU0sTUFBTSxFQUFaOztBQUVBLElBQUksVUFBSixHQUFpQixZQUFXO0FBQ3hCLE1BQUUsV0FBRixFQUFlLE1BQWYsQ0FBc0IsVUFBVSxDQUFWLEVBQWE7QUFDL0IsVUFBRSxjQUFGOztBQUVBLFlBQUksUUFBUSxFQUFFLElBQUYsQ0FBWjtBQUNBO0FBQ0EsVUFBRSx1QkFBRixFQUEyQixLQUEzQixFQUFrQyxJQUFsQyxDQUF1QyxZQUFZO0FBQy9DLGdCQUFJLE9BQU8sRUFBRSxJQUFGLENBQVg7QUFDQSxpQkFBSyxJQUFMLENBQVUsTUFBVixFQUFrQixRQUFsQjtBQUNBLGlCQUFLLElBQUwsQ0FBVSxZQUFWLEVBQXdCLEtBQUssSUFBTCxFQUF4QjtBQUNBLGlCQUFLLElBQUwsQ0FBVSxhQUFWO0FBQ0gsU0FMRDs7QUFRQSxVQUFFLElBQUYsQ0FBTztBQUNILGtCQUFNLE1BREg7QUFFSCxpQkFBSyxhQUZGO0FBR0gsa0JBQU0sTUFBTSxTQUFOLEVBSEg7QUFJSCxxQkFBUyxvQkFKTjtBQUtILHNCQUFVO0FBTFAsU0FBUDtBQVFILEtBckJEO0FBdUJILENBeEJEOztBQTBCQSxJQUFJLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBVSxJQUFWLEVBQWdCO0FBQ3ZDLFlBQVEsR0FBUixDQUFZLElBQVo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsQ0E1QkQ7O0FBOEJBLElBQUksSUFBSixHQUFXLFlBQU07QUFDYixRQUFJLFVBQUo7QUFDSCxDQUZEOztBQUlBLEVBQUUsWUFBVTtBQUNSLFFBQUksSUFBSjtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcblxuY29uc3QgYXBwID0ge31cblxuYXBwLnN1Ym1pdEZvcm0gPSBmdW5jdGlvbigpIHtcbiAgICAkKCcjZm9ybUJvZHknKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCAkZm9ybSA9ICQodGhpcyk7XG4gICAgICAgIC8vc2hvdyBzb21lIHJlc3BvbnNlIG9uIHRoZSBidXR0b25cbiAgICAgICAgJCgnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nLCAkZm9ybSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgJGJ0biA9ICQodGhpcyk7XG4gICAgICAgICAgICAkYnRuLnByb3AoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICAkYnRuLnByb3AoJ29yaWdfbGFiZWwnLCAkYnRuLnRleHQoKSk7XG4gICAgICAgICAgICAkYnRuLnRleHQoJ1NlbmRpbmcgLi4uJyk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiAnaGFuZGxlci5waHAnLFxuICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICBzdWNjZXNzOiBhZnRlcl9mb3JtX3N1Ym1pdHRlZCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTidcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbiAgICBcbn1cblxubGV0IGFmdGVyX2Zvcm1fc3VibWl0dGVkID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBcbiAgICAvLyBpZiAoZGF0YS5yZXN1bHQgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgLy8gICAgICQoJ2Zvcm0jcmV1c2VkX2Zvcm0nKS5oaWRlKCk7XG4gICAgLy8gICAgICQoJyNzdWNjZXNzX21lc3NhZ2UnKS5zaG93KCk7XG4gICAgLy8gICAgICQoJyNlcnJvcl9tZXNzYWdlJykuaGlkZSgpO1xuICAgIC8vIH1cbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5hcHBlbmQoJzx1bD48L3VsPicpO1xuXG4gICAgLy8gICAgIGpRdWVyeS5lYWNoKGRhdGEuZXJyb3JzLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICAvLyAgICAgICAgICQoJyNlcnJvcl9tZXNzYWdlIHVsJykuYXBwZW5kKCc8bGk+JyArIGtleSArICc6JyArIHZhbCArICc8L2xpPicpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgJCgnI3N1Y2Nlc3NfbWVzc2FnZScpLmhpZGUoKTtcbiAgICAvLyAgICAgJCgnI2Vycm9yX21lc3NhZ2UnKS5zaG93KCk7XG5cbiAgICAvLyAgICAgLy9yZXZlcnNlIHRoZSByZXNwb25zZSBvbiB0aGUgYnV0dG9uXG4gICAgLy8gICAgICQoJ2J1dHRvblt0eXBlPVwiYnV0dG9uXCJdJywgJGZvcm0pLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICAgICAgJGJ0biA9ICQodGhpcyk7XG4gICAgLy8gICAgICAgICBsYWJlbCA9ICRidG4ucHJvcCgnb3JpZ19sYWJlbCcpO1xuICAgIC8vICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi5wcm9wKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgIC8vICAgICAgICAgICAgICRidG4udGV4dChsYWJlbCk7XG4gICAgLy8gICAgICAgICAgICAgJGJ0bi5wcm9wKCdvcmlnX2xhYmVsJywgJycpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9Ly8gZW5kIG9mIGVsc2Vcbn1cblxuYXBwLmluaXQgPSAoKSA9PiB7XG4gICAgYXBwLnN1Ym1pdEZvcm0oKTtcbn1cblxuJChmdW5jdGlvbigpe1xuICAgIGFwcC5pbml0KClcbn0pXG5cbiAgICAgICAgXG5cbiAgICAgICAgXG4gXG4iXX0=
