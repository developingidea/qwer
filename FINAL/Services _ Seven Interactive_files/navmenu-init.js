jQuery(document).ready(function($) {
    // Mobile Navigation
    $('.mobile-toggle').on('click', function() {
        if ($('.main-nav').hasClass('open-nav')) {
            $('.mobile-toggle span').removeClass('white-color');
            $('.main-nav').removeClass('open-nav');
            $('.masthead').removeClass('revealed');
                $('.menu-panel').stop().animate({
                                    left: '-500px'
                                    }, 500, function() {
                                    // Animation complete.
                                    });
        } else {
            $('.mobile-toggle span').addClass('white-color');
            $('.main-nav').addClass('open-nav');
            $('.masthead').addClass('revealed');
           $('.menu-panel').stop().animate({
                                    left: 0
                                    }, 500, function() {
                                    // Animation complete.
                                    });
        }
    });




    $('.mastwrap, .intro, .standard-header, .mastfoot').on('click', function() {
            $('.mobile-toggle span').removeClass('white-color');
            $('.main-nav').removeClass('open-nav');
            $('.masthead').removeClass('revealed');
                $('.menu-panel').stop().animate({
                                    left: '-500px'
                                    }, 500, function() {
                                    // Animation complete.
                                    });
    });

    //Navigation Sub Menu Triggering
    $('.menu-panel .trigger-sub-nav').on('mouseenter', function() {
        $('.menu-panel .sub-nav').stop().slideUp('fast');
        $(this).find('.menu-panel .sub-nav').stop().slideDown('slow');
    });

    
    $('.menu-panel .menu-item-has-children > a').on('mouseenter', function() {

        $('.menu-panel .sub-menu').stop().slideUp('fast');
        $(this).closest('li').find('.sub-menu').stop().slideDown('slow');
        
        return false;

    });

    $('.menu-panel .main-nav-menu').on('mouseleave', function() {
        $('.menu-panel .sub-menu').stop().slideUp('fast');
        $('.menu-panel .sub-nav').stop().slideUp('fast');
        return false;

    });


});    
