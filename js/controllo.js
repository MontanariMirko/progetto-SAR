// funzione al caricamento della pagina html
$(document).ready(function() {
	controllo_richieste();
	controllo_messaggi();
	controllo_novita();
});
//controllo che siano presenti delle nuove richieste di amicizia
function controllo_richieste(){
	$.ajax({
				url: "../php/conteggio_richieste.php",
				type: "POST",
				data: {username: $.cookie('username')},
				dataType: "text",
				success: function(risposta){
					if(risposta!='')
						$('#nrichiesta').html(risposta);
				}
	});	
	
	setTimeout('controllo_richieste()', 1000);
}
//controllo che siano presenti dei nuovi messaggi
function controllo_messaggi(){
	$.ajax({
		url: '../php/conteggio_messaggi.php',
		data: {username: $.cookie('username')},
		type: 'POST',
		dataType: 'text',
		success: function(risposta){
			if(risposta != 0){
				$('#nmessaggi').html(risposta);
			} else if( risposta == 0){
				$('#nmessaggi').html('');
			}
		}
	});
	
	setTimeout('controllo_messaggi()', 1000);
}
//controllo se sono presenti delle novità nella rete sociale
function controllo_novita(){
	$.ajax({
		url: '../php/conteggio_novita.php',
		data: {username: $.cookie('username')},
		type: 'POST',
		dataType: 'text',
		success: function(risposta){
			if(risposta != 0){
				$('#nnovita').html(risposta);
			} else if( risposta == 0){
				$('#nnovita').html('');
			}
		}
	});
	
	setTimeout('controllo_novita()', 1000);
}
