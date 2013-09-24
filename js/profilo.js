// funzione al caricamento della pagina html
$(document).ready(function() {
			//controllo dei cookie
			if($.cookie('username') == null){
				$(window.location).attr('href', '../index.html');
			}
			//carico la bacheca
			$('#muro').load("profilo_utente.html");
			
			//carico nome barra menù
			$.ajax({
			url: "../php/bacheca_nome.php",
			type: "POST",
			data: {usr:$.cookie('username')},
			dataType: "json",
			success: function (risposta) {	//Cosa faccio alla risposta del server?
				$('#benvenuto').html(risposta.nome+" "+risposta.cognome);
			}
		});
		
		//caricamento dati rss			
		$.post('../php/rss.php', function(data) {
		  $('#news').html(data);
		  //caricamento funzione per far scorrere le notizie
		  $("ul#ticker01").liScroll();
		});	
		
		
			
});		

		function profilo(){
			$(window.location).attr('href', 'profilo.html?'+$.cookie('username'));
		};
				
		function logout(){
			$.removeCookie('username', { path: '/' });
			$(window.location).attr('href', '../index.html');
		};
		
		function rete(){
			$(window.location).attr('href', '../php/rete_sociale.php?'+$.cookie('username'));
		};