	// SETTINGS
	animationOutStyle = 'rotateRoomTopOut',
	animationInStyle = 'rotateRoomBottomIn';	

	function showpage(pagename) {
	 	var actual = $('#'+pagename);
	 	$('a[data-page=' + pagename + ']').addClass('activepagelink');
		$(actual).addClass('animatein');
		$('nav ul li a').addClass('nopointerevent');
		$('.pages.activepage').removeClass('pt-page-' + animationInStyle + ' activepage').addClass('pt-page-' + animationOutStyle + ' animateout');
		setTimeout(function () {
			$('.animatein').removeClass('inactivepage').addClass('activepage').addClass('pt-page-' + animationInStyle + '').removeClass('animatein');
		}, 300);
		setTimeout(function () {
			$('.animateout').removeClass('pt-page-' + animationOutStyle + ' active animateout').addClass('inactivepage');
		}, 1250);
		setTimeout(function () {
			$('.pt-page-' + animationInStyle + '').removeClass('pt-page-' + animationInStyle + '');
			$('nav ul li a').removeClass('nopointerevent');
		}, 1500);
		if ( $('a[data-page=' + pagename + ']').find('firstload')) {
			$('a[data-page=' + pagename + ']').removeClass('firstload');
			var actualfirst = pagename + 'first';
			window[actualfirst]();
		}
	 }

	$(window).load(function () {
		showpage('first');
		$('.loading').delay(200).fadeOut(300);
	});

	$(document).ready(function () {
		// BODY FADEIN
		var body = $("body");
			body.css({
			   opacity: 0
			})
			.delay(300)
			.animate({
			   opacity: 1
			}, 1200);
		
		// PAGE LOAD
		$('[data-page]').click(function (e) {			
			// var href = this.getAttribute('href');
			var actualbase = $(this).data('page');
			showpage(actualbase)
			$('ul li a').removeClass('activepagelink');
			$('a[data-page=' + actualbase + ']').addClass('activepagelink');
			$('.page').fadeIn(1000).addClass('activehomepage').removeClass('inactivehomepage');
			e.preventDefault();
		});
		// FUNCTION LINK
		$('[data-function]').click(function (e) {
			var thisfunction = $(this).data('function');
			startfunction(thisfunction);
			e.preventDefault();
		});
	 });

	function startfunction(type) {
		if ( type == 'invite') {
			alert('invite')
		}
		if ( type == 'share') {
			alert('share')
		}
	}

	// FIRST LOAD ANIMATION
	$(document).on('click', ".firstload", function() {
	 	var actualfirst = $(this).data('page') + 'first';
	 	$(this).removeClass('firstload');
	 	window[actualfirst]();
	});

	function firstfirst() {

	}

	function secondfirst() {

	}

	function thirdfirst() {

	}

	function showmessage(title, message, offsettop) {
		$('body').append('<div class="messagelayer"><div class="messagebox" style="margin-top: '+offsettop+'px"><h3>'+ title +'</h3><p>'+ message +'</p></div></div>');
	 	$('.nyerteslayer .messagetext').css({ opacity: '0', marginTop: '-200px'}).delay(50).animate({ opacity: '1', marginTop: '180px'}, 900, 'easeInOutQuart');
	 	$('.nyerteslayer').fadeIn(400);
	 }

	// WINNERS ANIMATION
	$('.winnersbox > ul li').click(function(){
		var box=$(".weeks");
		var itempos = $(this).index();
		if ( itempos == '0') {
			box.animate({ left: -40},"fast");
			box.animate({ left: +30},"fast");
			box.animate({ left: 0},"fast");
		} else {
			box.animate({ left: itempos*-510-40},"fast");
			box.animate({ left: itempos*-510+30},"fast");
			box.animate({ left: itempos*-510},"fast");
		}
	});