jQuery(document).ready(function ($) {
    "use strict";
    // Blog vars
    var $container = $('#main-content .blog-masonry');
    var blog_loadingType = ts_js_vars.blog_infinite_loading_style;
    var triggerLoadingSelector = ".infinite-loading a";
    var itemSelector = ".masonry-item";
    var contentSelector = "#main-content .blog-masonry";
    if (ts_js_vars.blog_style == 'list') {
        itemSelector = ".blog-item";
        contentSelector = "#main-content .post-list";
    };

    var infinite_scroll_blog = {
        loading: {
            selector: '.infinite-wrapper',
            img: ts_js_vars.loading_img,
            msgText: "",
            finishedMsg: "All posts loaded.",
        },
        nextSelector: "a.van-next",
        navSelector: ".pagenavigato .pagi",
        itemSelector: itemSelector,
        contentSelector: contentSelector,
        extraScrollPx: 50,
        triggerLoadingSelector: triggerLoadingSelector,
        debug: false,
    };

    // // Portfolio vars
    var $container_portfolio = $('.porotfolio-isotop');
    var portfolio_loadingType = ts_js_vars.portfolio_infinite_loading_style;
    var triggerLoadingSelector = ".infinite-loading a";
    var itemSelector = ".porotfolio-item";
    var contentSelector = ".porotfolio-isotop";
    var nextSelector = 'a.van-next';
    var next_page_href = $(nextSelector).length ? $(nextSelector).attr('href').replace('/page/', '?page=') : '#';
    $(nextSelector).attr('href', next_page_href);
    var infinite_scroll_portfolio = {
        loading: {
            selector: '.infinite-wrapper',
            img: ts_js_vars.loading_img,
            msgText: "",
            finishedMsg: "All posts loaded.",
        },
        nextSelector: "a.van-next",
        navSelector: ".pagenavigato .pagi",
        itemSelector: itemSelector,
        contentSelector: contentSelector,
        extraScrollPx: 50,
        triggerLoadingSelector: triggerLoadingSelector,
        debug: false,
    };


    // Call masonry before infinite
    $container.imagesLoaded(function () {
        $container.masonry({});
    });
    // Call masonry before infinite
    $container_portfolio.imagesLoaded(function () {
        $container_portfolio.masonry({});
    });

    $(window).load(function () {

        twitterslide();

        profilesinger();

        slidegrallery();

        profile();

        photoslide();

        workslide();

        porotfolioisotop();

        porotfoliomasonry();

        blogmansory();

        Skill();

        menubobile();

        sliderager();

        init();
        if (ts_js_vars.blog_loop_style == 'infinite-loading') {
            ts_infinite_loading(infinite_scroll_blog, blog_loadingType);
        }
        ;
        if (ts_js_vars.portfolio_loop_style == 'infinite-loading') {
            ts_infinite_loading(infinite_scroll_portfolio, portfolio_loadingType);
        }
        ;
    });
    // Twitter
    function twitterslide() {
        if ($(".owl-twitter").length > 0) {

            $(".owl-twitter").owlCarousel({
                autoPlay: 4000,
                slideSpeed: 1000,
                navigation: false,
                pagination: false,
                singleItem: true
            });
            var $owl_twitter = $(".owl-twitter").data('owlCarousel');
            $('#prev-twitter').click(function (event) {
                $owl_twitter.prev();
            });

            $('#next-twitter').click(function (event) {
                $owl_twitter.next();
            });
        }
    }

    // Profile Singer
    function profilesinger() {
        if ($("#owl-portfolio-singer").length > 0) {
            $("#owl-portfolio-singer").owlCarousel({
                autoPlay: 4000,
                slideSpeed: 1000,
                navigation: false,
                pagination: false,
                singleItem: true
            });
            var $owl_singer = $("#owl-portfolio-singer").data('owlCarousel');
            $('#prev-portfolio').click(function (event) {
                $owl_singer.prev();
            });

            $('#next-portfolio').click(function (event) {
                $owl_singer.next();
            });
        }
    }

    // Grallery Blog
    function slidegrallery() {
        if ($(".owl-grallery").length > 0) {

            $(".owl-grallery").owlCarousel({
                autoPlay: 4000,
                slideSpeed: 1000,
                navigation: true,
                pagination: false,
                singleItem: true,
                navigationText: ['&#xf0d9;', '&#xf0da;']
            });
        }
    }

    // Profile
    function profile() {
        if ($("#owl-service").length > 0) {

            $("#owl-service").owlCarousel({
                autoPlay: 4000,
                slideSpeed: 1000,
                navigation: false,
                pagination: false,
                singleItem: true,
            });
            var $owl_service = $("#owl-service").data('owlCarousel');
            $('#prev-service').click(function (event) {
                $owl_service.prev();
            });

            $('#next-service').click(function (event) {
                $owl_service.next();
            });
        }
    }

    // Photo
    function photoslide() {
        if ($(".owl-photo").length > 0) {

            $(".owl-photo").owlCarousel({
                items: 2,
                autoPlay: 4000,
                slideSpeed: 1000,
                navigation: false,
                pagination: false,
                singleItem: false,
                itemsCustom: [[0, 1], [320, 2], [480, 4], [768, 1], [992, 2], [1200, 3]]
            });

            var $owl_photo = $(".owl-photo").data("owlCarousel");

            $('#prev-photo').click(function (event) {
                $owl_photo.prev();
            });

            $('#next-photo').click(function (event) {
                $owl_photo.next();
            });
        }
    }

    // Work
    function workslide() {
        if ($("#owl-testimonial").length > 0) {
            var $owl_photo = $("#owl-testimonial")
            $owl_photo.owlCarousel({
                items: 2,
                autoPlay: 4000,
                slideSpeed: 1000,
                navigation: false,
                pagination: false,
                singleItem: false,
                itemsCustom: [[0, 1], [320, 2], [480, 3], [768, 4], [992, 5], [1200, 5]]
            });
        }
    }

    // porotfolio-isotop
    function porotfolioisotop() {
        if ($('#porotfolio-isotop').length > 0) {
            var $porotfolioisotop = $('#porotfolio-isotop')
            // initialize Isotope
            $porotfolioisotop.isotope({
                itemSelector: '.porotfolio-item',
                layoutMode: 'fitRows'
            });

            $('.filter-portfolio li a').click(function (event) {
                var filterValue = $(this).attr('data-filter');
                $porotfolioisotop.isotope({filter: filterValue});
                $('.active').removeClass('active');
                $(this).parent('li').addClass('active');
                return false;
            });
        }
    }

    // porotfolio masonry
    function porotfoliomasonry() {
        if ($('#porotfolio-isotop-masonry').length > 0) {
            var $porotfoliomasonry = $('#porotfolio-isotop-masonry')
            // initialize Isotope
            $porotfoliomasonry.isotope({
                itemSelector: '.porotfolio-item',
                masonry: {}
            });

            $('.filter-portfolio li a').click(function (event) {
                var filterValue = $(this).attr('data-filter');
                $porotfoliomasonry.isotope({filter: filterValue});
                $('.active').removeClass('active');
                $(this).parent('li').addClass('active');
                return false;
            });
        }
    }

    // blog masonry
    function blogmansory() {
        if ($('#blog-masonry').length > 0) {
            var $blogmasonry = $('#blog-masonry')
            // initialize Isotope
            $blogmasonry.isotope({
                itemSelector: '.masonry-item',
                masonry: {
                    // columWidth:'.grid-size'
                }
            });
        }
    }

    // Skill
    function Skill() {
        if ($(window).width() > 767) {
            //CountUp
            $('.skill-item').appear(function () {
                var count_element = $('.skill-number', this).html();
                $(".skill-number", this).countTo({
                    from: 0,
                    to: count_element,
                    speed: 2500,
                    refreshInterval: 50,
                });
            });
            //Animation
            new WOW().init();
        }
    }

    // Menu
    function menubobile() {
        $('.button-menu').click(function () {
            if (!$('#menu').hasClass('show-menu')) {
                $('#menu').addClass('show-menu');
            }
        })
        $('#close-menu').click(function (event) {
            $('#menu').removeClass('show-menu');
        });
    }

    var widthDev = $(window).width();
    if ((widthDev < 1200) && (widthDev >= 768)) {
        $('.menu-nav li').click(function () {
            $(this).toggleClass('ts_hover');
        });

    } else if (widthDev <= 767) {
        $('.menu-nav li').click(function () {
            $(this).toggleClass('ts_hover');
        });
    } else {
        $('#menu-main-menu').addClass('ts-menu-destop');
    }

    // function Slider Rager
    function sliderager() {
        if ($('.slider-rage').length) {
            $('.slider-rage').noUiSlider({
                start: [300, 800],
                connect: true,
                range: {
                    'min': [100],
                    'max': [1000]
                },
                serialization: {

                    lower: [

                        $.Link({
                            target: $("#price-min")
                        }),

                        $.Link({
                            target: function (value, handleElement, slider) {
                                $("#span-min").text('£ ' + value);
                            }
                        })

                    ],

                    upper: [
                        $.Link({
                            target: $("#price-max")
                        }),

                        $.Link({
                            target: function (value, handleElement, slider) {
                                $("#span-max").text('- £ ' + value);
                            }
                        })
                    ],

                    // Set some default formatting options.
                    // These options will be applied to any Link
                    // that doesn't overwrite these values.
                    format: {
                        decimals: 0
                    }

                }
            });
        }
    }

    //Google Map
    function init() {
        if ($('#maps-canvas').length > 0) {
            var lathlng = $('#maps-canvas').attr('data-latlng');
            var latharray = lathlng.split(",")
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 15,

                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(latharray[0], latharray[1]),

                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#000000"}, {"lightness": 17}]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{"color": "#000000"}, {"lightness": 20}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#000000"}, {"lightness": 17}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{"color": "#000000"}, {"lightness": 18}]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{"color": "#000000"}, {"lightness": 16}]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{"color": "#000000"}, {"lightness": 21}]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]
                }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{"color": "#000000"}, {"lightness": 19}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#000000"}, {"lightness": 20}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
                }]
            };

            // Get the HTML DOM element that will contain your map
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('maps-canvas');

            // Create the Google Map using out element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);
        }
    }

    $("#portfolio .icon-bars").click(function () {
        $(".filter-portfolio").slideToggle('slow');
    });
    if (jQuery().chosen) {
        jQuery(".woocommerce-ordering .orderby").chosen();

        jQuery('select').chosen();
    }

    $("#wrap").fitVids();
    $("#wrap").fitVids({customSelector: "iframe[src^='http://w.soundcloud.com']"});

    function ts_infinite_loading(infinite_scroll, loadingType) {
// Masonry, Imagesreloaded, Infinitiscroll, Isotope
        jQuery(document).ready(function ($) {
            $(infinite_scroll.contentSelector).infinitescroll(
                infinite_scroll,
                function (newElements) {
                    var $newElems = $(newElements).css({opacity: 0});
                    $newElems.imagesLoaded(function () {
                        $newElems.animate({opacity: 1});
                    });

                    $(infinite_scroll.contentSelector).masonry('appended', $newElems, true);

                    $newElems.imagesLoaded(function () {
                        // $container.isotope( 'appended', $newElems );
                        $(infinite_scroll.contentSelector).isotope('appended', $newElems);
                    });
                });
        });

        if (loadingType == 'auto-loading') {


        } else if (loadingType == 'trigger-loading') {

            $(window).unbind('.infscr');
            jQuery(infinite_scroll.triggerLoadingSelector).click(function () {
                jQuery(infinite_scroll.contentSelector).imagesLoaded(function () {
                    jQuery(infinite_scroll.contentSelector).infinitescroll('retrieve');
                });
                return false;
            });
            $(document).ajaxError(function (e, xhr, opt) {
                if (xhr.status == 404) $('a.van-next').remove();
            });
        }
    }

// Skill bar
    jQuery('.skillbar').each(function () {
        jQuery(this).find('.skillbar-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 6000);
    });

});
