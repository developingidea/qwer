jQuery(document).ready(function($) {
/*global $:false */
/*global window: false */

(function(){
  "use strict";


	$(document).ready(function($) {

	// hide messages

		// on submit...
		$("#contactform #submit").click(function() {

			//required:

			//name
			var name = $("#contactform input#name").val();
			var name_base = $("#contactform input#name").data('error-msg');

			//email (check if entered anything)
			var email = $("#contactform input#email").val();
			var email_base = $("#contactform input#email").data('error-msg');
			//email (check if entered anything)

			// comments
			var comments = $("#contactform textarea#message").val();
			var comments_base = $("#contactform textarea#message").data('error-msg');


			function isValidEmailAddress(emailAddress) {
			    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
			    return pattern.test(emailAddress);
			}

			if(name == ""){
				$("#contactform input#name").focus();
				$('#contactform input#name').attr('placeholder',name_base);
				$('#contactform input#name').addClass('error-msg');
				return false;
			}
			else if(email == ""){
				//$("#error").fadeIn().text("Email required");
				$("#contactform input#email").focus();
				$('#contactform input#email').attr('placeholder',email_base);
				$('#contactform input#email').addClass('error-msg');
				return false;
			}
			else if (email != "") {  // If something was entered
				if (!isValidEmailAddress(email)) {
					$("#contactform input#email").focus();
					$('#contactform input#email').val('');
					$('#contactform input#email').attr('placeholder',email_base);
					$('#contactform input#email').addClass('error-msg');
					return false;
				}
			}
			if(comments == ""){
				$("#contactform textarea#message").focus();
				$('#contactform textarea#message').attr('placeholder',comments_base);
				$('#contactform textarea#message').addClass('error-msg');
				return false;
			}
			else{

				return true;
			}

		});


		// on success...
		 function success(){
		 	$("#success").fadeIn();
		 	$("#contactForm").fadeOut();
		 }

	});

})();
});
