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
		
		//AUTOCOMPLETAMENTO
		$('#txt_cerca_amici').autocomplete({
			source: '../php/cerca_amici.php',
			select: function (e, ui) {
			  $(window.location).attr('href', 'profilo.html?' + ui.item.id);
			}
		});
		
		//Click "invio"
		$('#txt_cerca_amici').keyup(function(event) {
	    	if(event.keyCode == 13) {
	    		cerca_amici();
	    	}
  		});
		
		//cerca una lista di amici consigliati
		caricaConsigliati();	
});	
//reindirizzamento pagina rete sociale
function rete(){
	$(window.location).attr('href', '../php/rete_sociale.php?'+$.cookie('username'));
}
//reindirizzamento pagina profilo utente	
function profilo(){
	$(window.location).attr('href', 'profilo.html?'+$.cookie('username'));
};
//funzione di logout: vengono cancellati i cookie
function logout(){
	$.removeCookie('username', { path: '/' });
	$(window.location).attr('href', '../index.html');
};
//funzione cerca amici, dato un parametro testuale viene caricato un elenco di amici col nome simile
function cerca_amici () {
	$.ajax({
		url: '../php/cerca_amici.php',
		data: {term: $('#txt_cerca_amici').val()},
		dataType: "json",
		success: function (risultati) {
			$('#risultati_ricerca').html("");
			$('#btn_cerca_amici').focus();
			$('#txt_cerca_amici').val("");
			for (var i=0; i < risultati.length; i++) {
				var nuovo_div = $(document.createElement('div')).attr('class','amico');
				var nuovo_link = $(document.createElement('a'));
				nuovo_link.attr({
					'href':'#',
					'onclick':'apri_profilo("' + risultati[i].id + '")',
					'style':'margin-left:10px;margin-bottom:15px;'
				});
				nuovo_link.html(risultati[i].value);
				nuovo_link.appendTo(nuovo_div);
				$('#risultati_ricerca').prepend(nuovo_div);
			};
			$('#risultati_ricerca').prepend("<br><br><b>Risultati della ricerca</b><br><br>");
		}
	});
}

function apri_profilo (id_utente) {
	$(window.location).attr('href', 'profilo.html?' + id_utente);
}
//creazione della lista degli amici consigliati, andando a ricercare utenti in comune con i propri amici
function caricaConsigliati(){
	$.ajax({
		url: '../php/consigliati.php',
		type: "POST",
		data: {usr:$.cookie('username')},
		dataType: "json",
		success: function (risposta) {
			if(risposta!=false){
				$('#consigliati').html("<br><b>Amici che potresti conoscere</b></br><br>");
				for(i=0; i<risposta.length-1; i++){
					var amico = $(document.createElement('div')).attr('class','amico');
					var nome_amico = $(document.createElement('a')).attr('class','amico');
					nome_amico.attr('href','profilo.html?'+risposta[i].username);
					nome_amico.html(risposta[i].nome+" "+risposta[i].cognome);
					nome_amico.appendTo(amico);
					amico.appendTo('#consigliati');
				}
			}
		}
	});
}
