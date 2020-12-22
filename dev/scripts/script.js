
let scrolling = false;

let previousScroll = 0;

//smooth scrolling

$('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 900, 'swing');
});

const app = {}


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
            $('.overlayButton').removeClass('navButtonBlack');
            $('.overlayButton').removeClass('navGone');
        }

        // header is not in view
        else {
            $('.navLink').addClass('navLinkScrollUp');
            $('.headerList').removeClass('navGone');
            $('.headerNav')
                .removeClass('navGone')
                .addClass('navOverlay');
            $('.test').addClass('testShow');
            $('.overlayButton').addClass('navButtonBlack');
            $('.overlayButton').removeClass('navGone');
        }
    }

    //scrolling down
    if (currentScroll > previousScroll) {
        // header is in view
        if ((screenBottom > headerTop) && (screenTop < headerBottom)) {
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

app.navButton = () => {
    $('.overlayButton').on('click', function(e){
        e.preventDefault();
        
        let overlayShowing = $('.mobileNav').hasClass('mobileNavShow');

        // if the nav isn't opened yet
        if(!overlayShowing) {
            $('.mobileNav').addClass('mobileNavShow');
            $('.overlayButton').addClass('closeNavOverlay');

        //if nav is opened
        } else {
            $('.mobileNav').removeClass('mobileNavShow');
            $('.overlayButton').removeClass('closeNavOverlay');
            
        } // end of if
    })// end of event
}

app.navAction = () => {
    $('.navLinkMobile').on('click', function(){
        $('.mobileNav').removeClass('mobileNavShow');
        $('.overlayButton').removeClass('closeNavOverlay');
    })
}

// check if the device is a touch device, and add classes to the hover elements if it is not a touch device
app.addHover = () => {

    // check if browser doesnt' support touch
    let touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)


    if (!touchsupport) { // browser doesn't support touch
        $('.teamImage').addClass('teamImageHover');
        
    }
}


app.formSubmit = () => {
    $("#formBody").submit(function (e) {
        e.preventDefault();

        let $form = $('#formBody');
        $.post($form.attr("action"), $form.serialize());
  
        $('.formWrap').css('opacity', '0');
        setTimeout(() => {
            $('.formWrap').addClass('hideForm');
            $('.formSubmitted').removeClass('hideForm').css('opacity', '1');
        },500);
        
    });
}

app.closeCovid = () => {
    $('.closeOverlay').on('click', function(e) {
        e.preventDefault();
        $('body').css('overflow', 'scroll');
        $('.covidOverlay').fadeOut();
    })
}




app.init = () => {
    app.scrollingEvent();
    app.headerTextEffect();
    app.scrollEffects();
    app.viewTeam();
    app.navButton();
    app.navAction();
    app.addHover();
    app.formSubmit();
    app.closeCovid();
}

$(function(){
    app.init();
    AOS.init();
})