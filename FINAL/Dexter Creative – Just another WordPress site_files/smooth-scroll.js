jQuery(document).ready(function($) {
//SMOOTH TOP DOWN SCROLLING





if( !device.tablet() && !device.mobile() ) {

            //Desktop Navigation Scroll
            $(document).ready(function() {

                $(".scroll").on('click', function() {
                    var ScrollOffset = 80;
                    $("html, body").animate({
                        scrollTop: $($(this).attr("href")).offset().top-ScrollOffset + "px"
                    }, {
                        duration: 1500,
                        easing: "linear"
                    });

                    return false;
                });
            });
                        
        } else {
            
            //Mobile Navigation Scroll
            $(document).ready(function() {

                $(".scroll").click(function() {
                    var ScrollOffset = -5;
                    //alert(ScrollOffset);
                    $("html, body").animate({
                        scrollTop: $($(this).attr("href")).offset().top-ScrollOffset + "px"
                    }, {
                        duration: 1500,
                        easing: "linear"
                    });
                    return false;
                });

            });
           
        }

});        