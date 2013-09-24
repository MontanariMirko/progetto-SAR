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
		$('#txt_cerca_amici1').autocomplete({
			source: '../php/cerca_amici.php',
			select: function (e, ui) {
			  $('#utente1').attr('class',ui.item.id);
			}
		});
		//AUTOCOMPLETAMENTO
		$('#txt_cerca_amici2').autocomplete({
			source: '../php/cerca_amici.php',
			select: function (e, ui) {
				$('#utente2').attr('class',ui.item.id);
			}
		});
		
		
});	
function rete(){
	$(window.location).attr('href', '../php/rete_sociale.php?'+$.cookie('username'));
}
	
function profilo(){
	$(window.location).attr('href', 'profilo.html?'+$.cookie('username'));
};

function logout(){
	$.removeCookie('username', { path: '/' });
	$(window.location).attr('href', '../index.html');
};


function apri_profilo (id_utente) {
	$(window.location).attr('href', 'profilo.html?' + id_utente);
}

function calcola_bacon(){
	$.ajax({
			url: "../php/bacon.php",
			type: "POST",
			data: {username: $('#utente1').attr('class'), amico: $('#utente2').attr('class')},
			dataType: "text",
			success: function (risposta) {	//Cosa faccio alla risposta del server?
				$('#risultato_bacon').html(risposta);
			}
		});
}
