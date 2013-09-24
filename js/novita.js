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
		
		//caricamento delle novità
		carica_novita();
			
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

//controllo che siano presenti delle notivà nella rete sociale
function carica_novita(){
	$.ajax({
			url: "../php/carica_novita.php",
			type: "POST",
			data: {usr:$.cookie('username')},
			dataType: "json",
			success: function (risposta) {	//Cosa faccio alla risposta del server?
				if(risposta == false){
					$('#titolo').html("<b>Non ci sono novit&agrave;.");
					$('#elenco').html(" ");
				}
				else{
					$('#titolo').html("<b>Elenco delle novit&agrave;<br><br>");
					$('#elenco').html("");
					for(i=0;i<risposta.length;i++){
						var nuovo_div = $(document.createElement('div')).attr('class','div_messaggio');
						var div_data = $(document.createElement('span')).attr('class','data');
						var data_tmp = risposta[i].data.replace(" ", "T");
						var data = new Date(data_tmp);
						div_data.html(data.getHours()+":"+data.getMinutes() + " il " + data.getDate() + "-" + (data.getMonth()+1) + "-" + data.getFullYear());
						var div_testo = $(document.createElement('span'));
						div_testo.attr('style','margin:15px');
						div_testo.html(risposta[i].testo);
						div_data.appendTo(nuovo_div);
						div_testo.appendTo(nuovo_div);
						$('#elenco').prepend(nuovo_div);
					}
				}
			}
		});
		
	setTimeout('carica_novita()', 30000);
}
