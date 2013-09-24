// funzione al caricamento della pagina html
$(document).ready(function() {
		var username = document.location.search;
		username = username.substr(1,username.length);
		$.ajax({
			url: "../php/bacheca_nome.php",
			type: "POST",
			data: {usr:username},
			dataType: "json",
			success: function (risposta) {	//Cosa faccio alla risposta del server?
				$('#nome').html(risposta.nome+" "+risposta.cognome);
				$('#nome').css('font-weight', 'bold');
				var data = new Date(risposta.data);
				$('#data').html(data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear());
				$('#citta').html(risposta.citta);
				$('#lavoro').html(risposta.occupazione);
			}
		});
		 
		//se il profilo è il mio genera i bottoni bacheca, amici e modifica profilo
		if(username == $.cookie('username')){
			var miabacheca = $(document.createElement('button')).attr('id','miabacheca');
			miabacheca.html("Mia bacheca");
			miabacheca.appendTo('#area_bottoni');
			var listamici = $(document.createElement('button')).attr('id','listamici');
			listamici.attr('onclick', 'listamici();');
			listamici.html("Miei amici");
			listamici.appendTo('#area_bottoni');
			var rete = $(document.createElement('button')).attr('id','retesociale');
			rete.attr('onclick', 'rete_sociale();');
			rete.html("Rete sociale");
			rete.appendTo('#area_bottoni');
			var modifica = $(document.createElement('button')).attr('id','modifica');
			modifica.html("Modifica profilo");
			modifica.appendTo('#area_bottoni');
		}
		else{
			//creazione dinamica dei bottoni presenti nel profilo utente
			var miabacheca = $(document.createElement('button')).attr('id','miabacheca');
			miabacheca.html("Bacheca");
			miabacheca.appendTo('#area_bottoni');
			var listamici = $(document.createElement('button')).attr('id','listamici');
			listamici.attr('onclick', 'listamici();');
			listamici.html("Amici");
			listamici.appendTo('#area_bottoni');
			var rete = $(document.createElement('button')).attr('id','retesociale');
			rete.attr('onclick', 'rete_sociale();');
			rete.html("Rete sociale");
			rete.appendTo('#area_bottoni');
			$.ajax({
					url: "../php/contr_amicizia.php",
					type: "POST",
					data: {usr: $.cookie('username'), amico:username},
					dataType: "json",
					success: function(risposta){
						//non sono amici
						if(risposta==false){
							var richiesta = $(document.createElement('button')).attr('id','rich_amicizia');
							richiesta.attr('onclick','richiedi_amicizia();');
							richiesta.html("Richiedi l'amicizia");
							richiesta.appendTo('#area_bottoni');
						}
						else{
							//sono amici: amicizia sincrona
							if(risposta.tipo=='s'){
								var richiesta = $(document.createElement('button')).attr('id','annulla_amicizia');
								richiesta.attr('onclick','annulla_amicizia("s");');
								richiesta.html("Cancella l'amicizia");
								richiesta.appendTo('#area_bottoni');
								var info = $(document.createElement('span')).attr('id','info_amicizia');
								info.css('margin-left','15px');
								info.html("Siete amici");
								info.appendTo('#area_bottoni');
							}
							//amicizia asincrona
							if(risposta.tipo=='a'){
								//io seguo l'utente ma lui non segue me
								if(risposta.user==$.cookie('username') && risposta.amico==username){
									var richiesta = $(document.createElement('button')).attr('id','annulla_amicizia');
									richiesta.attr('onclick','annulla_amicizia("a");');
									richiesta.html("Cancella l'amicizia");
									richiesta.appendTo('#area_bottoni');
									var info = $(document.createElement('span')).attr('id','info_amicizia');
									info.css('margin-left','15px');
									info.html("Lo stai seguendo");
									info.appendTo('#area_bottoni');
								}
								//sono seguito ma non è mio amico
								if(risposta.user==username && risposta.amico==$.cookie('username')){
									var richiesta = $(document.createElement('button')).attr('id','completa_amicizia');
									richiesta.attr('onclick','completa_amicizia();');
									richiesta.html("Completa l'amicizia");
									richiesta.appendTo('#area_bottoni');
									var info = $(document.createElement('span')).attr('id','info_amicizia');
									info.css('margin-left','15px');
									info.html("Ti sta seguendo");
									info.appendTo('#area_bottoni');
								}
							}
							//richiesta d'amicizia già inviata
							if(risposta.tipo=='r'){
								if(risposta.user==$.cookie('username') && risposta.amico==username){
									var info = $(document.createElement('span')).attr('id','info_amicizia');
									info.css('margin-left','15px');
									info.html("Richiesta d'amicizia inviata");
									info.appendTo('#area_bottoni');
								}
								if(risposta.user==username && risposta.amico==$.cookie('username')){
									var info = $(document.createElement('span')).attr('id','info_amicizia');
									info.css('margin-left','15px');
									info.html("Ti ha inviato una richiesta d'amicizia");
									info.appendTo('#area_bottoni');
								}
							}
						}
					}
				});
		}
		
		caricaBacheca();
			
			$('#miabacheca').click(function(){
				caricaBacheca();
			});
			$('#modifica').click(function(){
				$('#muro').load("edit_profilo.html");
			});
			
			
			function caricaBacheca(){
				$('#area_info').html("<b><br>Bacheca personale</b>");
				$('#bacheca_personale').html(" ");
				$('#titolo_vicini').html(" ");
				$('#bacheca_vicini').html(" ");
				$.ajax({
					url: "../php/carica_stati.php",
					type: "POST",
					data: {usr: username},
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
							$('#bacheca_personale').prepend(nuovo_div);
							
						}
					}
				});
			};

});

function richiedi_amicizia(){
	var username = document.location.search;
	username = username.substr(1,username.length);
	$.ajax({
		url: "../php/richiesta_amicizia.php",
		type: "POST",
		data: {usr: $.cookie('username'),amico:username},
		dataType: "text",
		success: function(risposta){
			if(risposta == "OK"){
				$('#rich_amicizia').remove();
				var info = $(document.createElement('span')).attr('id','info_amicizia');
				info.css('margin-left','15px');
				info.html("Richiesta d'amicizia inviata");
				info.appendTo('#area_bottoni');
			}
		}
	});
}

function completa_amicizia(){
	var username = document.location.search;
	username = username.substr(1,username.length);
	$.ajax({
		url: "../php/completa_amicizia.php",
		type: "POST",
		data: {usr: $.cookie('username'),amico:username},
		dataType: "text",
		success: function(risposta){
			if(risposta == "OK"){
				$('#completa_amicizia').remove();
				$('#info_amicizia').remove();
				var richiesta = $(document.createElement('button')).attr('id','annulla_amicizia');
				richiesta.attr('onclick','annulla_amicizia("s");');
				richiesta.html("Cancella l'amicizia");
				richiesta.appendTo('#area_bottoni');
				var info = $(document.createElement('span')).attr('id','info_amicizia');
				info.css('margin-left','15px');
				info.html("Siete amici");
				info.appendTo('#area_bottoni');
			}
		}
	});
}

function annulla_amicizia(tipo){
	var username = document.location.search;
	username = username.substr(1,username.length);
	$.ajax({
		url: "../php/annulla_amicizia.php",
		type: "POST",
		data: {usr: $.cookie('username'),amico:username, gen:tipo},
		dataType: "text",
		success: function(risposta){
			if(risposta == "OK"){
				if(tipo=='a'){
					$('#annulla_amicizia').remove();
					$('#info_amicizia').remove();
					var richiesta = $(document.createElement('button')).attr('id','rich_amicizia');
					richiesta.attr('onclick','richiedi_amicizia();');
					richiesta.html("Richiedi l'amicizia");
					richiesta.appendTo('#area_bottoni');
				}
				if(tipo=='s'){
					$('#annulla_amicizia').remove();
					$('#info_amicizia').remove();
					var richiesta = $(document.createElement('button')).attr('id','completa_amicizia');
					richiesta.attr('onclick','completa_amicizia();');
					richiesta.html("Completa l'amicizia");
					richiesta.appendTo('#area_bottoni');
					var info = $(document.createElement('span')).attr('id','info_amicizia');
					info.css('margin-left','15px');
					info.html("Ti sta seguendo");
					info.appendTo('#area_bottoni');
				}
			}
		}
	});
}

function listamici(){
	var username = document.location.search;
	username = username.substr(1,username.length);
	//elenco degli amici
	$.ajax({
		url: "../php/lista_amicizia.php",
		type: "POST",
		data: {usr: username},
		dataType: "json",
		success: function(risposta){
			$('#area_info').html("<br><b>Lista amici</b>");
			$('#bacheca_personale').html(" ");
			for(i=0; i<risposta.length; i++){
				var amico = $(document.createElement('div')).attr('class','amico');
				var nome_amico = $(document.createElement('a')).attr('class','link_amico');
				nome_amico.attr('href','profilo.html?'+risposta[i].username);
				nome_amico.html(risposta[i].nome+" "+risposta[i].cognome);
				nome_amico.appendTo(amico);
				amico.appendTo('#bacheca_personale');
			}
		}
	});
	//elenco amici di amici
	$.ajax({
		url: "../php/amici_amici.php",
		type: "POST",
		data: {usr: username},
		dataType: "json",
		success: function(risposta){;
			if(risposta!=false){
				$('#titolo_vicini').html("<br><b>Amici di amici</b></br>");
				$('#bacheca_vicini').html(" ");
				for(i=0; i<risposta.length; i++){
					var amico = $(document.createElement('div')).attr('class','amico');
					var nome_amico = $(document.createElement('a')).attr('class','link_amico');
					nome_amico.attr('href','profilo.html?'+risposta[i].username);
					nome_amico.html(risposta[i].nome+" "+risposta[i].cognome);
					nome_amico.appendTo(amico);
					amico.appendTo('#bacheca_vicini');
				}
			}
		}
	});
}

function rete_sociale(){
	var username = document.location.search;
	username = username.substr(1,username.length);
	$(window.location).attr('href', '../php/rete_sociale.php?'+username);
}
