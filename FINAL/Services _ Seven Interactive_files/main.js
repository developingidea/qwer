// MAIN.JS
//--------------------------------------------------------------------------------------------------------------------------------
//This is main JS file that contains custom JS scipts and initialization used in this template*/
// -------------------------------------------------------------------------------------------------------------------------------
// Template Name: SEVEN.
// Author: Designova.
// Website: http://www.designova.net 
// -------------------------------------------------------------------------------------------------------------------------------
jQuery(document).ready(function($) {
/*global $:false */
/*global window: false */

(function(){
  "use strict";


$(function ($) {

     
    //Detecting viewpot dimension
     var vH = $(window).height();
     var vW = $(window).width();


     //Adjusting Intro Components Spacing based on detected screen resolution
     $('.fullwidth').css('height',vW);
     $('.fullheight').css('height',vH);
     $('.halfheight').css('height',vH/2);
     $('.halfwidth').css('width',vW/2);
     $('.half-height-min').css('min-height', vH/2);
     
    $('body').addClass('preloader-running');
    $('#mastwrap, #masthead').css('visibility','hidden');

    // makes sure the whole site is loaded
    $(window).load(function() {
            // will first fade out the loading animation
      $("#status").fadeOut();
            // will fade out the whole DIV that covers the website.
      $("#preloader").delay(1000).fadeOut(1000);
      $('body').removeClass('preloader-running');
      $('body').addClass('preloader-done');
      $("#mastwrap, #masthead").delay(1000).css('visibility','visible');
    });

    if ( $( "#wpadminbar" ).length) {
      
      $('.sticky-border-top').css('top', '30px');
      $('.mobile-toggle').css('top', '70px');
    }


    if($('.tag-section').text().length > 18)
      $('.tag-section').addClass('add-bottom-half');
    
    if($('.comments-section').text().length <= 38)
    {
      $('.comments-section').hide();
      $('.type-post .respond').css('margin-top','80px');
    }

    
    if($('.archive-pagination').text().length <= 99)
    {
      $('.archive-pagination').closest('section').hide();
      $('.archive-pagination').hide();
    }

    $('#cancel-comment-reply-link').addClass('btn btn-seven btn-seven-small btn-seven-dark')

    $('div.main-nav-menu li ul').slideUp(800);

    $('div.main-nav-menu li').mouseenter(function(){
      var this_menu_item = $(this);
      $(this).children('ul').stop().slideDown(800, function(){
        this_menu_item.closest('ul').css('height', 'auto');
      });
    });

    $('div.main-nav-menu li').mouseleave(function(){
      $(this).children('ul').stop().slideUp(800);
    });


    //Mobile Menu (multi level)
    $('nav.mobile-nav').meanmenu({
        meanScreenWidth: "1199"
      });


    $(".scroll-indicator").on('click', function() {
        var offset = 0; //Offset of 0px

        $('html, body').animate({
            scrollTop: $("#reveal-section").offset().top + offset
        }, 2000);
    });

    $('.bxslider').bxSlider({
      preloadImages: 'visible',
      touchEnabled: true,
      responsive: true,
      pager: false,
      controls: true
    });

    $(".team-carousel").owlCarousel({
        navigation : false,
        pagination: true,
        responsive: true,
        items: 1,
        touchDrag: true,
        navigationText: false,
        mouseDrag: true,
        itemsDesktop: [3000,3],
        itemsDesktopSmall: [1440,3],
        itemsTablet:[1024,3],
        itemsTabletSmall: [640,1],
        itemsMobile: [360,1],
        autoPlay: false,
        autoHeight: false
      });

    $(".intro-07-carousel").owlCarousel({
        navigation : true,
        pagination: false,
        responsive: true,
        items: 1,
        touchDrag: true,
        navigationText: false,
        mouseDrag: true,
        itemsDesktop: [3000,1],
        itemsDesktopSmall: [1440,1],
        itemsTablet:[1024,1],
        itemsTabletSmall: [640,1],
        itemsMobile: [360,1],
        autoPlay: false,
        autoHeight: false
      });


    $('#contactForm').submit(function(){
        $('.md-content').hide();
        $('.launch_modal').trigger("click");
        
        $.ajax({
          type: $("#contactForm").attr('method'),
          url: $("#contactForm").attr('action'),
          data: $("#contactForm").serialize(),
          success: function(data) {
            if(data == 'success')
            {
                $('#contactForm').each (function(){
                    this.reset();
                });
                $('.md-content').show();
            }
            else
            {
              $('.md-content').show();
              $('.md-content h3').html('Something went wrong!');
              $('.md-content p').html('Please try again.');
            }
          }
        });
        return false;
    });


    $('.aux-icon-btn').each(function(){
      var colorOnMouseOver = $(this).data('hover-color');
      $(this).mouseenter(function(){
        var defaultStyle = $(this).attr('style');
        $(this).data('default-style', defaultStyle);
        $(this).css('color', colorOnMouseOver);
      });
      $(this).mouseleave(function(){
        $(this).attr('style', $(this).data('default-style'));
      });
    });

    $('.news-list-item').each(function(){
      $(this).mouseenter(function(){
        var bg_image = $(this).data('hover-image');
        $(this).css('background-image', 'url('+bg_image+')');
      });
      $(this).mouseleave(function(){
        $(this).attr('style', ' ');
      });
    });

    $(".seven-carousel").owlCarousel({
      autoPlay: false, //Set AutoPlay to 5 seconds
      autoHeight : true,
      singleItem:true,
      navigation: false,
      pagination: true,
      items : 1,
      itemsDesktop : [1199,1],
      itemsDesktopSmall : [979,1]
    });

    $('.comment-reply-link').addClass('btn btn-seven btn-seven-small btn-seven-dark');
});
// $(function ($)  : ends

})();
//  JSHint wrapper $(function ($)  : ends



});

