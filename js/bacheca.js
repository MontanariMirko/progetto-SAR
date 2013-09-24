var time = 0;
// funzione al caricamento della pagina html
$(document).ready(function() {
			//controllo dei cookie
			if($.cookie('username') == null){
				$(window.location).attr('href', '../index.html');
			}
			//carico la bacheca
			$('#muro').load("muro.html");
			
			
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
			carica_bacheca();
});		
		//reindirizzamento alla pagina della rete sociale
		function rete(){
			$(window.location).attr('href', '../php/rete_sociale.php?'+$.cookie('username'));
		}
		//link alla pagina del profilo
		function profilo(){
			$(window.location).attr('href', 'profilo.html?'+$.cookie('username'));
		};
		//cancellazione dei cookie
		function logout(){
			$.removeCookie('username', { path: '/' });
			$(window.location).attr('href', '../index.html');
		};
		
		function pubblica_messaggio () {
			//controllo che ci sia qualcosa nel messaggio
		  	if($('#messaggio_bacheca').val() == ""){
		  		//Per ora ho lasciato un popup
		  		alert("Scrivi qualcosa");
		  	} else {
		  		//Mando la richiesta ajax
			  	$.ajax({
			  		url: "../php/messaggio_bacheca.php",
			  		type: "POST",
			  		data: {user: $.cookie('username'), testo: $('#messaggio_bacheca').val()},
			  		dataType: "text",
			  		success: function(risposta){
			  			//Se ho inserito tutto nel DB pubblico il messaggio
			  			if(risposta == "OK"){
							carica_bacheca();
							$('#messaggio_bacheca').val("Scrivi in bacheca");
			  			} else {
			  				//Anche qui per ora ho lasciato un popup
			  				alert(risposta);
			  			}
			  		}
			  	});
		  	}
		};
		//caricamento di tutti i messaggi presenti in bacheca
		function carica_bacheca(){
			$.ajax({
				url: "../php/carica_bacheca.php",
				type: "POST",
				data: {username: $.cookie('username'), data: time},
				dataType: "json",
				success: function(risposta){
					for (var i=0; i < risposta.length; i++) {
						var nuovo_div = $(document.createElement('div')).attr('class','div_messaggio');
						var div_utente = $(document.createElement('span')).attr('class','nome');
						div_utente.html(risposta[i].nome+" "+risposta[i].cognome);
						div_utente.appendTo(nuovo_div);
						var div_data = $(document.createElement('span')).attr('class','data');
						var data_tmp = risposta[i].data.replace(" ", "T");
						var data = new Date(data_tmp);
						div_data.html(data.getHours()+":"+data.getMinutes() + " il " + data.getDate() + "-" + (data.getMonth()+1) + "-" + data.getFullYear());
						div_data.appendTo(nuovo_div);
						var div_testo = $(document.createElement('div')).attr('class','testo');
						div_testo.html(risposta[i].testo);
						div_testo.appendTo(nuovo_div);
						$('#bacheca_muro').prepend(nuovo_div);
						time = risposta[i].data;
					}
				}
			});
			setTimeout('carica_bacheca()', 10000);	
		};
	