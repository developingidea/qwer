/*--------------------------------------------------------------------------------------------------------------------------------
JS for operating the sliding menu
-------------------------------------------------------------------------------------------------------------------------------
Author: Unbranded.
Website: http://www.unbranded.co 
Copyright: (C) 2014 
-------------------------------------------------------------------------------------------------------------------------------
*/
jQuery(document).ready(function($) {
/*global $:false */
/*global window: false */

(function(){
  "use strict";

  	$(document).ready(function() {  

		// Menu Action
		$('#mobile-nav-trigger').on('click', function(){
		    // $('#mobile-nav-trigger').toggleClass('active');
		    
		    $('#mobile-nav').toggleClass('mobile-nav-open');
		    $('.section-wrap').toggleClass('nav-opened');

		});

		$('.mobile-menu-item a').on('click', function(){
    		$('#mobile-nav-trigger').trigger('click');
    			
		})

		$('.section-wrap').on('click', function(){

			if ($('.mobile-nav').hasClass('mobile-nav-open')){
				$('#mobile-nav-trigger').trigger('click');
			}
    				
		})

});

})();


});