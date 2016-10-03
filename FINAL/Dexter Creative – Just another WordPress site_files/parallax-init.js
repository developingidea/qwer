jQuery(document).ready(function($) {
/*global $:false */
/*global window: false */

  (function(){
      "use strict";
      
        $(window).bind('load', function () {

        if( !device.tablet() && !device.mobile() ) {

                /* if non-mobile device is detected*/ 
                  // Parallax Init
                  $('.parallax').each(function() {
                        $(this).parallax('50%', 0.1, true);
                    });
                            
            } else {
                
                /* if mobile device is detected*/ 
                $('.parallax').removeClass('parallax');
            }

        });

  })();
});