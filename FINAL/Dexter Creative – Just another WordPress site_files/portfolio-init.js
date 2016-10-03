/*global $:false */
/*global window: false */
jQuery(document).ready(function($) {
(function(){
  "use strict";
//VIEWPORT DETECTION:


 $(window).load(function() {

 	setTimeout(function(){

/*-----------------------------------------------------
Shuffle Grid
-------------------------------------------------------*/


			/* initialize shuffle plugin */ 
			var $grid = $('#grid'),
			$sizer = $grid.find('.shuffle__sizer');

			$grid.imagesLoaded( function(){ 
				$grid.shuffle({
					itemSelector: '.shuf-item', // the selector for the items in the grid
					sizer: $sizer,
					speed: 750
				});

			});



			/* reshuffle when user clicks a filter item */
			$('#filter li a').click(function (e) {
				e.preventDefault();
				// set active class
				$('#filter li a').removeClass('active');
				$(this).addClass('active');
				// get group name from clicked item
				var groupName = $(this).attr('data-group');
				// reshuffle grid
				$grid.shuffle('shuffle', groupName );
			});


	},1000);
	
	});

	

})();
});