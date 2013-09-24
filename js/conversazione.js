var amico;
var fondo = 1000;
var mio_nome, mio_cognome;

// funzione al caricamento della pagina html
$(document).ready(function() {
	//controllo dei cookie
	if($.cookie('username') == null){
		$(window.location).attr('href', '../index.html');
	}
	
	//carico nome barra menù
	$.ajax({
		url: "../php/bacheca_nome.php",
		type: "POST",
		data: {usr:$.cookie('username')},
		dataType: "json",
		success: function (risposta) {	//Cosa faccio alla risposta del server?
			mio_nome = risposta.nome;
			mio_cognome = risposta.cognome;
			$('#benvenuto').html(risposta.nome+" "+risposta.cognome);
		}
	});
		
	//caricamento dati rss			
	$.post('../php/rss.php', function(data) {
	  $('#news').html(data);
	  //caricamento funzione per far scorrere le notizie
	  $("ul#ticker01").liScroll();
	});
	
	
	amico = document.location.search;
	amico = amico.substr(1,amico.length);
	
	//Caricamento dei messaggi
	$.ajax({
		url: '../php/carica_messaggi.php',
		type: 'POST',
		data:{username: $.cookie('username'), amico: amico},
		dataType: "json",
		success: function(risposta){
			for (var i=0; i < risposta.length; i++) {
			  var nuovo_div = $(document.createElement('div')).attr('class','messaggio');
			  var mittente = $(document.createElement('div')).attr('class','mittente');
			  var nome = $(document.createElement('span')).attr('class','nome');
			  nome.html(risposta[i].nome + " " + risposta[i].cognome);
			  nome.appendTo(mittente);
			  var data = $(document.createElement('span')).attr('class','data');
			  data.html("- inviato il " + risposta[i].data)
			  data.appendTo(mittente);
			  var testo = $(document.createElement('div')).attr('class','testo');
			  testo.html(risposta[i].testo);
			  mittente.appendTo(nuovo_div);
			  testo.appendTo(nuovo_div);
			  nuovo_div.appendTo($('#storico'));
			  fondo += nuovo_div.height();
			};
			$('html, body').animate({ scrollTop: fondo }, 'slow');
			
			aggiorna_messaggi_letti();
			aggiorna_messaggi(); 
		}
	});
	
	$('#invia').click(function() {
		invia_messaggio();
	});
	
	//Click "invio"
	$('#messaggio').keyup(function(event) {
    	if(event.keyCode == 13) {
    		invia_messaggio();
    	}
	});
	
});

function invia_messaggio(){
	//controllo che ci sia qualcosa nel messaggio
  	if($.trim($('#messaggio').val()) == ""){
  		//Per ora ho lasciato un popup
  		//alert("Scrivi qualcosa");
  		$('#messaggio').val('');
  	} else {
  		//Mando la richiesta ajax
	  	$.ajax({
	  		url: "../php/invia_messaggio.php",
	  		type: "POST",
	  		data: {mitt: $.cookie('username'), dest: amico, testo: $('#messaggio').val()},
	  		dataType: "text",
	  		success: function(risposta){
	  			//Se ho inserito tutto nel DB pubblico il messaggio
	  			if(risposta == "OK"){
					//aggiorna_messaggi();
					scrivi_messaggio();
					$('#messaggio').val("");
					
	  			} else {
	  				//Anche qui per ora ho lasciato un popup
	  				alert(risposta);
	  			}
	  		}
	  	});
  	}
}

function scrivi_messaggio(){
	var nuovo_div = $(document.createElement('div')).attr('class','messaggio');
			  	var mittente = $(document.createElement('div')).attr('class','mittente');
				var nome = $(document.createElement('span')).attr('class','nome');
				nome.html(mio_nome + " " + mio_cognome);
				nome.appendTo(mittente);
				var data = $(document.createElement('span')).attr('class','data');
				
				//SISTEMALO!!!!
				data.html("- inviato ora " );
				
				data.appendTo(mittente);
				var testo = $(document.createElement('div')).attr('class','testo');
				testo.html($('#messaggio').val());
				mittente.appendTo(nuovo_div);
				testo.appendTo(nuovo_div);
				nuovo_div.appendTo($('#storico'));
				fondo += nuovo_div.height();
				$('html, body').animate({ scrollTop: fondo }, 'slow');
}

function aggiorna_messaggi(){
	$.ajax({
		url: '../php/carica_messaggi_nuovi.php',
		data: {username: $.cookie('username'), amico: amico},
		dataType: "json",
		type: 'POST',
		success: function(risposta){
			for (var i=0; i < risposta.length; i++) {
				var nuovo_div = $(document.createElement('div')).attr('class','messaggio');
			  	var mittente = $(document.createElement('div')).attr('class','mittente');
				var nome = $(document.createElement('span')).attr('class','nome');
				nome.html(risposta[i].nome + " " + risposta[i].cognome);
				nome.appendTo(mittente);
				var data = $(document.createElement('span')).attr('class','data');
				data.html("- inviato il " + risposta[i].data)
				data.appendTo(mittente);
				var testo = $(document.createElement('div')).attr('class','testo');
				testo.html(risposta[i].testo);
				mittente.appendTo(nuovo_div);
				testo.appendTo(nuovo_div);
				nuovo_div.appendTo($('#storico'));
				fondo += nuovo_div.height();
				$('html, body').animate({ scrollTop: fondo }, 'slow');
			};
			
			aggiorna_messaggi_letti(); 
		}
	});
	
	setTimeout('aggiorna_messaggi()', 1000);
}

function aggiorna_messaggi_letti(){
	$.ajax({
		url: '../php/messaggi_letti.php',
		data: {username: $.cookie('username'), amico: amico},
		type: 'POST',
		dataType: 'text',
		success: function(risposta){
			if(risposta != 'OK'){
				alert(risposta);
			}
		}
	});
}

function profilo(){
	$(window.location).attr('href', 'profilo.html?'+$.cookie('username'));
};

function logout(){
	$.removeCookie('username', { path: '/' });
	$(window.location).attr('href', '../index.html');
};

function rete(){
	$(window.location).attr('href', '../php/rete_sociale.php?'+$.cookie('username'));
}
