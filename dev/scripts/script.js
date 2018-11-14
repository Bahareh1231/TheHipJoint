let scrolling = false;

let previousScroll = 0;

//smooth scrolling

$('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 600, 'swing');
});

const app = {}

app.submitForm = function() {
    $('#formBody').submit(function (e) {
        e.preventDefault();

        let $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function () {
            let $btn = $(this);
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
    
}

let after_form_submitted = function (data) {
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
}


// scroll event 
app.scrollingEvent = () => {
    $(window).scroll(function () {
        scrolling = true;

    })
}

app.scrollUpNav = function () {

    let headerTop = $("header").offset().top;
    let headerBottom = $("header").offset().top + $("header").outerHeight();
    let screenBottom = $(window).scrollTop() + window.innerHeight;
    let screenTop = $(window).scrollTop();

    let currentScroll = $(window).scrollTop();

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
            $('.headerNav')
                .removeClass('navGone')
                .addClass('navOverlay');
        }
    }

    //scrolling down
    if (currentScroll > previousScroll) {
        // header is in view
        if ((screenBottom > headerTop) && (screenTop < headerBottom)) {
            $('.logo').addClass('navGone');
            $('.headerList').addClass('navGone');
        }

        // header is not in view
        else {
            $('.logo').addClass('navGone');
            $('.navLink').removeClass('navLinkScrollUp');
            $('.headerList').addClass('navGone');
            $('.headerNav').addClass('navGone');
        }// end of else header is not in view
    } // end of scrolling down

    previousScroll = currentScroll;

}

app.scrollEffects = function () {
    setInterval(function () {
        if (scrolling = true) {
            scrolling = false;
            // app.appearOnScroll();
            app.scrollUpNav();
        } // end of if scrolling
    }, 250) // end of interval
};


// making 'move laugh play' animated
app.headerTextEffect = () => {
    setTimeout(()=> {
        $('.move').addClass('headerTextEffect');
    }, 200);
    setTimeout(() => {
        $('.laugh').addClass('headerTextEffect');
    }, 300);
    setTimeout(() => {
        $('.play').addClass('headerTextEffect');
    }, 400);
}

// to view different team members 
app.viewTeam = function() {
    $('.teamImage').on('click', function(e){
        e.preventDefault();
        $('.showTeam').addClass('fade');
        setTimeout(() => {
            $('.showTeam').removeClass('showTeam');
        }, 200)

        // hide overlay on selected item
        $('.hideOverlay').removeClass('hideOverlay');

        let removeOverlay = $(this).find('.imageOverlay');
        $(removeOverlay).addClass('hideOverlay');

        // show the bio of the selected person
        let clickedPerson = $(this).data('src');
        
        let openProfile = $('.aboutContent').find('.aboutBlock');

        $.each(openProfile, function (index, value) {

            let name = ($(value).attr('data-src'));

            if (clickedPerson === name) {
                $(value).addClass('fade')
                setTimeout(() => {
                    $(value)
                        .addClass('showTeam')
                        .removeClass('fade');
                    $('html, body').animate({
                        scrollTop: $('.showTeam').offset().top
                    }, 600, 'swing');
                },200)
                
            }// end of ternary operator 
        })// end of loop
    })// end of event
}

app.init = () => {
    app.submitForm();
    app.scrollingEvent();
    app.headerTextEffect();
    app.scrollEffects();
    app.viewTeam();
}

$(function(){
    app.init()
})

        

        
 
