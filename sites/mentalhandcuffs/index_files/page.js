
	$(window).scroll(function(){
		var scroll = $(this).scrollTop();
		var window_width = $(window).width();
		if ( scroll <= 590 ) {
			$('#stickynav').stop().animate({marginTop:-80}, 500, 'easeOutCirc');			 
        }
        if ( scroll >= 599 ) {
        	$('#stickynav').stop().animate({marginTop:0}, 800, 'easeOutCirc');
        	$('nav li a[href^="#"]').removeClass('activelink');        	
        }
		// if ( $('body').hasClass('scroll') && scroll <= 400 && scroll >= 250 && window_width >= 800 ) {
		// 	$('body').animate({scrollTop:0}, 1500, 'easeOutCirc').removeClass('scroll');			      
  //       }
        if ( scroll >= 900) {
			$('body').addClass('scroll');			
        }
   //      if ( $('body').hasClass('scroll') && scroll <= 400 && scroll >= 250 ) {
			// $('body').animate({scrollTop:0}, 1500, 'easeOutCirc').removeClass('scroll');			      
   //      }
        if (scroll <= 300) {
        	$('#scrolltop').fadeOut(300);
        	$('body').removeClass('scroll');                
        } else { 
        	$('#scrolltop').fadeIn(600);         	      
      	}
	  	// $('header').css({ 'background-position-y': -40-(scroll)/4.5});

	  	$('header #bg').css({ 'background-position-y': -20-(scroll)/4.5});

	  	$('header .content').css({ opacity: 1-(0.004*scroll), marginTop: -(scroll)/2.3 });		  	

	});


	$('#scrolltop, a[href=#home], span.name').on('click', function (e) {
		$('html, body').stop().animate({
            'scrollTop': 0
        }, 2000, 'easeInOutCirc', function () {
            // window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
        e.preventDefault();
	});

	$('a[href=#learnmore], .scrolldown').click( function(e) {
		$( "a[href=#hello]" ).trigger( "click" );
		e.preventDefault();
	});


	$('.close, .mobileclick').click( function() {
		$('#projects').delay(450).fadeOut(500);
		$('#projects .posfix .data .logoline').delay(100).animate({marginLeft:-600}, 350);
		$('#projects .posfix .data .content').delay(100).animate({ marginTop:100, opacity: 0}, 350);
		$('#projects .posfix .data .sidebar').delay(100).animate({ marginLeft:500, opacity: 0}, 350);
		
		setTimeout(function () {
			$('#projects .posfix .data').empty();		
		}, 700);
	});

		$( ".img span" ).live( "click", function() {

			var imgurl = $(this).css('background-image');
	        imgurl = imgurl.replace('url(','').replace(')','');

	        $('#modal').remove();	
	  		
	  		$('#projects .posfix .data').append('<div id="modal"><div id="modalclose"></div><img src="'+imgurl+'" alt=""></div>')
	  		$('.data #modal').animate({ marginTop: 35, opacity: 1 }, 500)

  			
		});

		$( "#modalclose" ).live( "click", function() {
			$('#modal').fadeOut(400);
			setTimeout(function () {
				$('#modal').remove();	
			}, 500);
  			
		});



	
	$('#referenciak .container ul li').click( function() {
		$target = $('#referenciak');
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top -70
        }, 1000, 'easeInOutCirc', function () {
            // window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
		$('#projects').delay(100).fadeIn(300);
		var content = $(this).find('.projectpage').html();
		//$('#referenciak .container ul').addClass('blur');
		$('#projects .posfix .data').empty().append(content);

		var contentheight = $('.data .content').height();

		$('#projects .posfix .data .logoline').delay(300).animate({marginLeft:0}, 600, 'easeInOutCirc');
		$('#projects .posfix .data .content').delay(300).animate({ marginTop:0, opacity: 1}, 600, 'easeInOutCirc');

		$('#projects .posfix .data .sidebar').delay(300).animate({ marginLeft:0, opacity: 1}, 600, 'easeInOutCirc');
	});



	$(window).load(function () {
		$('header #bg').delay(600).fadeIn(1000);
		$('header').css({ 'background': '#fff' })
		$('.loading').delay(200).fadeOut(300);
		sidebarlinks();
		addmobile();
	});


	$(window).resize(function() {
		addmobile();
	});

	function addmobile() {
		var window_width = $(window).width();
		if ( window_width <= 700) {
			$('#stickynav').addClass('mobile');
		} else {
			$('#stickynav').removeClass('mobile');
		}
		if ( window_width >= 700) {
			$('#stickynav ul').show();
			$('#stickynav').removeClass('mobile');
		}
	}

	function sidebarlinks() {
		var news = ($('.sidebar ul li').index())+1;

		var baseopacity = 1.3,
			minusopacity = 0.33;

		for (i = 0; i < news; i++) {

			var baseopacity = baseopacity-minusopacity;

			$('.sidebar ul li:nth-child('+(i+1)+') i').css({ opacity: baseopacity });
		}			
	}

	$(document).ready(function () {
		window.scrollTo(0, 1);

		var wwidth = $(window).width();


		var quotesize = 1000;
		var quotedelay = 4000;

		quotes();
		 function quotes() {
              $(".move ul")
              .animate({marginLeft: '0px', opacity: 1}, {duration: 500}).delay(quotedelay)
              .animate({marginLeft: -quotesize*1, opacity: 1}, {duration: 500}).delay(quotedelay)
              .animate({marginLeft: -quotesize*2, opacity: 1}, {duration: 500}).delay(quotedelay)
              .animate({marginLeft: -quotesize*3, opacity: 1}, {duration: 500}).delay(quotedelay)
              .animate({marginLeft: -quotesize*4, opacity: 1}, {duration: 500}).delay(quotedelay)
              .animate({ opacity: 0}, {duration: 100, complete: quotes})
          }



		$('.image-gallery > div').on('click', function (e) {
			var bg = $(this).css('background-image').replace(/^url|[\(\)]/g, '');
			$('.overlay-gallery .photoviewer').empty().append('<img src="'+ bg+'" alt="">');
			$('.overlay-gallery').delay(200).fadeIn(600);
			$('.overlay-gallery .bg').delay(300).fadeIn(1200);
		});

		$('.overlay-gallery ').on('click', function (e) {
			$('.overlay-gallery').delay(100).fadeOut(500);
			$('.overlay-gallery .bg').fadeOut(600);
		});


		// BODY FADEIN
		$('header .posfix').delay(200).fadeIn(300);
		var stickynav = $('header nav').html();
		$('header').after('<div id="stickynav"><div class="container"><div id="mobilemenu"><i></i><i></i><i></i></div> <span class="name">mentalhandcuffs</span>'+stickynav+' <a href="https://www.facebook.com/mentalhandcuffs" target="_blank" class="fb"><i class="fa fa-facebook"></i></a></div></div>');
		$('#stickynav img').on('click', function (e) {
			$('body').delay(100).animate({scrollTop:0}, 2000, 'easeInOutCirc');
		});
		$('#stickynav li a').on('click', function (e) {

			$('#mobilemenu').removeClass('activemenu');
			
			if ( $('#stickynav').hasClass('mobile') ) {
				$('#stickynav ul').delay(300).slideToggle(200);
				$('#stickynav .mobilemenu').toggleClass('activemenu');
			}

		// $('#stickynav.mobile ul li a').on('click', function (e) {
		// 	$('#stickynav ul').slideToggle(400);
		// 	$('#stickynav #mobilemenu').toggleClass('activemenu')
		// });


			$('#stickynav li a').removeClass('active clickactive');
			$(this).addClass('clickactive');		

	        e.preventDefault();
	        $(document).off("scroll");
	        $(this).addClass('active');

	        $('a').each(function () {
	            $(this).removeClass('active');
	        })
	        var target = this.hash,
	            menu = target;
	        $target = $(target);
	        $('html, body').stop().animate({
	            'scrollTop': $target.offset().top -70
	        }, 2000, 'easeInOutCirc', function () {
	            // window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
		});

		$('#stickynav #mobilemenu').on('click', function (e) {
			$('#stickynav ul').slideToggle(200);
			$(this).toggleClass('activemenu')
		});

		

		var body = $("body");
			body.css({
			   opacity: 0
			})
			.delay(300)
			.animate({
			   opacity: 1
			}, 1200);		

	 });



(function($) {

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);


// SCROLL VISIBLE ANIMATION
var win = $(window);
var allMods = $("section");
allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});
var poz = $(window).scrollTop();
win.scroll(function(event) {  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {  
      	el.addClass("come-in");
    } 
  });  
});

	// SCROLL - HEADER
	// $(document).bind('scroll',function(e){
	//     $('section').each(function(){
	//         if ( $(this).offset().top < window.pageYOffset + 80 
	//         	&& $(this).offset().top + $(this).height() > window.pageYOffset + 80 ) {
	//         		var current = $(this).attr('id');
	// 				window.location.hash = $(this).attr('id');		

	//         } 

	//     });

	//     $('header').each(function(){
	//         if ( $(this).offset().top < window.pageYOffset + 80 
	//         	&& $(this).offset().top + $(this).height() > window.pageYOffset + 80 ) {
	// 		        var loc = window.location.href,
	// 		    	index = loc.indexOf('#');
	// 				if (index > 0) {
	// 				  window.location.hash = '';
	// 				}	
	//         } 

	//     });
	// });


$(document).on("scroll", onScroll);

$('nav li a[href^="#"]').on('click', function (e) {
		$(this).addClass('activelink');
        e.preventDefault();
        $(document).off("scroll");
        $(this).addClass('active');

        $('a').each(function () {
            $(this).removeClass('active');
        })

        $('#stickynav a[href=#' + target + ']').addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top -70
        }, 2000, 'easeInOutCirc', function () {
            // window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
});



function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#stickynav li a, nav li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - 100 <= scrollPos ) {
        	$('#stickynav li a, nav li a').removeClass("active clickactive");
            currLink.addClass("active");
        }
        else{
      
        }
    });
}



function scrollto(page) {
        $('html, body').delay(200).animate({
            scrollTop: $("#"+ page +"").offset().top - 40
        }, 600, 'swing');
}


// function loadhash() {

// if(window.location.hash)
//   {
//     var hash_value = window.location.hash.replace('#', '');
//      if (hash_value == ' '){
//       // start
//       }
//   }
// }