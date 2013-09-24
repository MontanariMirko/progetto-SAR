// funzione al caricamento della pagina html
$(document).ready(function() {
	 $('#username').keyup(function(event) {
    	if(event.keyCode == 13) {
    		inviologin();
    	}
  	});
  	$('#password').keyup(function(event) {
    	if(event.keyCode == 13) {
    		inviologin();
    	}
  	});
	
	$('#login').click(inviologin);

});

function inviologin() {
		var dati ={
			username: $('#username').val(),
			password: $('#password').val()
		};
			 
		$.ajax({
			url: "php/login.php",
			type: "POST",
			data: dati,
			dataType: "text",
			success: function (risposta) {	//Cosa faccio alla risposta del server?
				//$('#prova_risposta').html(risposta);
				if(risposta == "OK"){
					$.cookie('username', $('#username').val(), { path: '/' });
					$(window.location).attr('href', 'html/bacheca.html');
				} else {
					$('#messaggio_errore').html(risposta);
				}
			}
		});
};