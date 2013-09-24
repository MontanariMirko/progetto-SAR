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
		$('#destinatario').autocomplete({
			source: '../php/cerca_amici_messaggi.php?username=' + $.cookie('username'),
			select: function (e, ui) {
			  $(window.location).attr('href', 'conversazione.html?' + ui.item.id);
			  //alert("Tra poco potrai fare una conversazione con:" + ui.item.id + ". Per ora aspetta ancora un po'!!!")
			}
		});
		
		//Click "invio"
		$('#txt_cerca_amici').keyup(function(event) {
	    	if(event.keyCode == 13) {
	    		cerca_amici();
	    	}
  		});
  		
  		//Bottone che fa comparire o scomparire il div per iniziare
  		//una nuova conersazione
  		$('#scegli_utente').click(function() {
  			if($('#div_scelta_utente').is(':hidden')){
  				$('#div_scelta_utente').slideDown(1000);
  			} else {
  				$('#div_scelta_utente').slideUp(1000);
  			}
  		});
  		
  		//Qui carico tutte le conversazioni presenti
  		$.ajax({
  			url: "../php/carica_conversazione.php",
  			type: "POST",
  			data: {username: $.cookie('username')},
  			dataType: "json",
  			success: function (risposta) {
  				//for(var i=0,j=risposta.length; i<j; i++){
				$('#conversazioni_aperte').html(" ");
				for (var i=0; i < risposta.length; i++) {

					var nuovo_div = $(document.createElement('div')).attr('id',risposta[i].utente);
					nuovo_div.attr('class','div_messaggio');
					if(risposta[i].letto == 0){
						nuovo_div.attr('style','background: #b9d9b9; font-weight:bold;');
					}
					var nuovo_link = $(document.createElement('a'));
					nuovo_link.attr({
						'href':'#',
						'onclick':'apri_conversazione("'+risposta[i].utente+'")',
						'style':'margin-left:10px;margin-bottom:15px;'
					});
					nuovo_link.html(risposta[i].nome + ' ' + risposta[i].cognome);
					nuovo_link.appendTo(nuovo_div);
					$('#conversazioni_aperte').prepend(nuovo_div);
				};
				$('#conversazioni_aperte').prepend("<br><br><b>Conversazioni presenti</b><br><br>");
				//};
			  }
  		});
  					
});		


function apri_conversazione (e) {
  $(window.location).attr('href', 'conversazione.html?' + e);
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
};