// Template Name: DEXTER.
// Author: Unbranded.
// Version 1.0 - Initial Release
// Website: http://www.unbranded.co
// Copyright: (C) 2015
// -------------------------------------------------------------------------------------------------------------------------------
jQuery(document).ready(function($) {
/*global $:false */
/*global window: false */

  $(document).ready(function() {

        //BG SLIDESHOW WITH ZOOM EFFECT

        /*$.mbBgndGallery.buildGallery({
            containment:".home01",
            timer:1000,
            effTimer:6000,
            controls:false, //updated in v1.1
            grayScale:false,
            shuffle:true,
            preserveWidth:false,
            preserveTop: true,
            effect:"zoom",
            activateKeyboard: false,

             images:[
             "images/home/home01/1.jpg",
             "images/home/home01/2.jpg",
             "images/home/home01/3.jpg"
             ],

            onStart:function(){},
            onPause:function(){},
            onPlay:function(opt){},
            onChange:function(opt,idx){},
            onNext:function(opt){},
            onPrev:function(opt){}
        });*/


        //TWITTER INIT (Updated with compatibility on Twitter's new API):
        //PLEASE READ DOCUMENTATION FOR INFO ABOUT SETTING UP YOUR OWN TWITTER CREDENTIALS:
        // $(function ($) {
        //     $('.twitter').tweet({
        //         modpath: './twitter/',
        //         count: 4,
        //         loading_text: 'loading twitter update...',
        //         username:'unbrandedco',
        //         join_text: "auto",
        //         template: "{text}<br/>{time}",
        //         /* etc... */
        //     });
        // });






        //Home02 Slider Initialization
        $(".home02-slider").owlCarousel({
            loop:true,
            nav: true,
            navText : [
                "<i class='ion-arrow-left-b'></i>",
                "<i class='ion-arrow-right-b'></i>"
            ],
            dots: false,
            items: 1,
            autoplay: true,
            smartSpeed:1000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });



        var sliderWrapH = $('.home05-slider-wrap').height();
            $('.home05-text-wrap').height(sliderWrapH);

        var owl = $(".home05-slider");

     // Progressbar Initialization After Home05 Slider Initialization

        owl.on('onInitAfter',function(e){
          $('#progressbar svg').remove();
            setTimeout(function(){
                var circle = new ProgressBar.Circle('#progressbar', {
                    color: 'rgba(255,29,77,0.8)',
                    strokeWidth: 3,
                    duration: 5000
                });
                circle.animate(1.0);
            },50);
        });

    // Home05 Slider Initialization
        $(".home05-slider").on('onInitAfter',function(e){

            var visibleItems = 1;
            var no_of_items = 0;
            $(".home05-slider").find('.owl-stage .owl-item').each(function() {
              no_of_items = no_of_items+1;
            });

            if(no_of_items == visibleItems)
            {
              $(this).find('.owl-controls').css('display','none');
            }

        });

        $(".home05-slider").owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            items: 1,
            mouseDrag: false,
            autoplay: true,
            callbacks:true,
            autoplayTimeout: 5000,
            smartSpeed:1000,
            autoplayHoverPause: true,
            autoplaySpeed: 3000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });

    // Progressbar initialization on each owl item change

         owl.on('onChangeState',function(e){

           $('#progressbar svg').remove();
           setTimeout(function(){
               var circle = new ProgressBar.Circle('#progressbar', {
                   color: $('#progressbar').data('color'),
                   strokeWidth: 3,
                   duration: 5500
               });
               circle.animate(1.0);
           },50);
        });


        $(window).load(function() {

          if( !device.tablet() && !device.mobile() ) {
            setTimeout(function(){
              animateItem();
            },2000);
        	}

        	else {
        			$('.animated').css("visibility","visible");
        	}

          function animateItem() {

            var notFound = true;
            $('.animated').each(function(){

              if(!$(this).data('animated') && notFound)
              {
                $(this).appear(function() {
                  $(this).css('visibility','visible');
                  $(this).addClass($(this).data('fx'));
                },{accY: -100});

                $(this).data('animated', 'yes');
                notFound = false;

              }

              if(!notFound)
                return;

            });

            setTimeout(function() {
              animateItem();
            }, 200);
          }

        });

        var owl = $(".home03-slider");

        $(".home03-slider").owlCarousel({
            loop:true,
            dots: false,
            nav: true,
            navText : [
                "<i class='icon ion-chevron-left'></i>",
                "<i class='icon ion-chevron-right'></i>"
            ],
            center:true,
            items: 1,
            callbacks:true,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 2000,
        });


        $(".home07-slider").owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 12000,
            smartSpeed: 2000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });

        $(".home10-slider").owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            smartSpeed: 2000,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayTimeout: 5000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            items: 1
        });


        owl.on('onChangeState',function(e){

            $this = $(".home03 .owl-item .video-bg.player");

            $this.each(function(){
                $(this).YTPPause();
                $(this).attr('data-status','pause');
            });

        });


        owl.on('onTransitionEnd',function(e){

            $this = $(".home03 .owl-item.active.center .video-bg.player");

             $this.each(function(){
                $(this).YTPPlay();
                $(this).attr('data-status','play');
            });

        });

        owl.on('onTransitionStart',function(e){

            $this = $(".home03 .owl-item .video-bg.player");

             $this.each(function(){
                $(this).YTPPause();
                $(this).attr('data-status','play');
            });

        });


    //Home03 Video Intialization

        // Playes video on non-mobile and non-tablet devices
        if( !device.tablet() && !device.mobile() ) {

            $(".home03-slider .video-bg.player").each(function(){
                $(this).mb_YTPlayer();
            });

        } else {

            // Shows video thumbnail image on mobile and tablet devices
            $('.video-bg.player').each(function(){
                var videoSec  = $(this);
                var videoSec_vLink = videoSec.data('property');
                var youtube_video_id = videoSec_vLink.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

                    if (youtube_video_id.length == 11) {
                        videoSec.css('background', 'url(http://img.youtube.com/vi/'+youtube_video_id+'/hqdefault.jpg)')
                    }
            });

        }








    });

});
