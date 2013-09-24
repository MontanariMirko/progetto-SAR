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
				$('#benvenuto').html(risposta.nome+" "+risposta.cognome);
			}
		});
		
		//caricamento dati rss			
		$.post('../php/rss.php', function(data) {
		  $('#news').html(data);
		  //caricamento funzione per far scorrere le notizie
		  $("ul#ticker01").liScroll();
		});	
		
		//controllo le richieste di amicizia
		$.ajax({
			url: "../php/risposta_amicizie.php",
			type: "POST",
			data: {usr:$.cookie('username')},
			dataType: "json",
			success: function (risposta) {	//Cosa faccio alla risposta del server?
				if(risposta != false){
					var stringa = "Di seguito &egrave; presente l'elenco delle persone che hanno richiesto la tua amicizia.<br>";
					stringa += "Puoi decidere se:<br>";
					stringa += "<ul><li>Accettare e diventare amici;</li>";
					stringa += "<li>Rifiutare ma permettere di farti seguire;</li>";
					stringa += "<li>Rifiutare e annullare la sua richiesta d'amicizia.</li></ul>";
					$('#titolo').html("<b>Richieste d'amicizia.</b><br><br>"+stringa);
					for (var i=0; i < risposta.length; i++) {
						var utente = $(document.createElement('div')).attr('id','utente'+risposta[i].user);
						utente.html(risposta[i].nome+" "+risposta[i].cognome+" ha richiesto la tua amicizia.");
						utente.appendTo('#elenco');
						var div_bottoni = $(document.createElement('div')).attr('id','bottoni'+risposta[i].user);
						div_bottoni.appendTo('#elenco');
						var bottone1 = $(document.createElement('button')).attr('id',risposta[i].user);
						bottone1.attr('onclick','accetta(this);');
						bottone1.html("Accetta");
						bottone1.appendTo('#bottoni'+risposta[i].user);
						var bottone2 = $(document.createElement('button')).attr('id',risposta[i].user);
						bottone2.attr('onclick','rifiuta(this);');
						bottone2.html("Rifiuta");
						bottone2.appendTo('#bottoni'+risposta[i].user);
						var bottone3 = $(document.createElement('button')).attr('id',risposta[i].user);
						bottone3.attr('onclick','seguire(this);');
						bottone3.html("Fatti seguire");
						bottone3.appendTo('#bottoni'+risposta[i].user);
					}
				}
				else
				$('#titolo').html("<b>Nessuna richiesta di amicizia presente.</b>");
				$('#elenco').html();
			}
		});
		
			
});		

function rete(){
	$(window.location).attr('href', '../php/rete_sociale.php?'+$.cookie('username'));
};

function profilo(){
	$(window.location).attr('href', 'profilo.html?'+$.cookie('username'));
};

function logout(){
	$.removeCookie('username', { path: '/' });
	$(window.location).attr('href', '../index.html');
};

function accetta(e){
	$.ajax({
			url: "../php/accetta_amicizia.php",
			type: "POST",
			data: {usr: e.id, amico:$.cookie('username'), tipo: 's'},
			dataType: "text",
			success: function (risposta) {
				if(risposta == "OK"){
					$('#utente'+e.id).remove();
					$('#bottoni'+e.id).remove();				
				}
			}
	});
}

function rifiuta(e){
	$.ajax({
			url: "../php/rifiuta_amicizia.php",
			type: "POST",
			data: {usr: e.id, amico:$.cookie('username')},
			dataType: "text",
			success: function (risposta) {
				if(risposta == "OK"){
					$('#utente'+e.id).remove();
					$('#bottoni'+e.id).remove();				
				}
			}
	});
}

function seguire(e){
	$.ajax({
			url: "../php/accetta_amicizia.php",
			type: "POST",
			data: {usr: e.id, amico:$.cookie('username'), tipo:'a'},
			dataType: "text",
			success: function (risposta) {
				if(risposta == "OK"){
					$('#utente'+e.id).remove();
					$('#bottoni'+e.id).remove();				
				}
			}
	});
}