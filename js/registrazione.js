// funzione al caricamento della pagina html
$(document).ready(function() {
	
	//Controllo che l'utente abbia scritto il nome
	$('#nome').keyup(function() {
		if($('#nome').val() == ""){ //Se non c'è scritto niente... lo faccio notare
			$('#cont_nome').html('Devi inserire il tuo nome!');
			$('#cont_nome').css('color', 'red');
		} else {
			$('#cont_nome').html('OK');
			$('#cont_nome').css('color', 'green');
		}
		controlla_registrazione();
	});
	
	//Controllo che l'utente abbia scritto il cognome
	$('#cognome').keyup(function() {
		if($('#cognome').val() == ""){ //Se non c'è scritto niente... lo faccio notare
			$('#cont_cognome').html('Devi inserire il tuo cognome!');
			$('#cont_cognome').css('color', 'red');
		} else {
			$('#cont_cognome').html('OK');
			$('#cont_cognome').css('color', 'green');
		}
		controlla_registrazione();
	});
	
	/*
	 * Funzione che si attiva alla pressione di un tasto all'interno della textbox
	 * dedicata allo username
	 */
	$('#username').keyup(function() {
		if($('#username').val() == "" ){ //Se non c'è scritto niente... lo faccio notare
			$('#cont_username').html('Inserisci una username');
			$('#cont_username').css('color', 'black');
		} else {	
			//Mando una richiesta ajax al server che controlla  
			//se lo username esiste già  
			$.ajax({
				type: "POST",
				url: "../php/controllo_username.php",
				data: { username: $('#username').val() },
				success: function (risposta) {
					//Se lo username è libero
					if(risposta == 0) {
						$('#cont_username').html('Username disponibile');
						$('#cont_username').css('color', 'green');
					} else { //Username già in uso 
						$('#cont_username').html('Username gi&agrave; in uso');
						$('#cont_username').css('color', 'red');
					}
					controlla_registrazione();
				}
			});
		}
		controlla_registrazione();
	});
	
	/*
	 * Funzione che si attiva alla pressione di un tasto all'interno della textbox
	 * dedicata alla password
	 */
	$('#password').keyup(function() {
		//Se la password è più corta di 6 
		if($('#password').val().length < 6){
			$('#cont_password').html('La password deve essere almeno di 6 caratteri');
			$('#cont_password').css('color', 'red');
		} else {
			$('#cont_password').html('OK');
			$('#cont_password').css('color', 'green');
		}
		controlla_registrazione();
	});
	
	/*
	 * Funzione che si attiva alla pressione di un tasto all'interno della textbox
	 * dedicata al controllo della password
	 */
	$('#password2').keyup(function() {
		if($('#password').val() != $('#password2').val()) {
			$('#cont_password2').html('La password non combacia');
			$('#cont_password2').css('color', 'red');
		} else {
			$('#cont_password2').html('Password uguali');
			$('#cont_password2').css('color', 'green');
		}
		controlla_registrazione();
	});
	
	$('#data').keyup(function() {
		if($('#data').val() == ""){
			$('#cont_data').html('Devi inserire la data di nascita');
			$('#cont_data').css('color','red');
		} else {
			$('#cont_data').html('Data inserita');
			$('#cont_data').css('color','green');
		}
		controlla_registrazione();
	});
	
	//Il pannello che compare per selezionare la data
	$('#data').datepicker({
		changeMonth: true,		//Faccio scegliere il mese
		changeYear: true,		//Faccio scegliere l'anno
		dateFormat: "yy-mm-dd",	//Il formato
		onSelect: function (data) {
			if(data != "" ){
				$('#cont_data').html('Data inserita');
				$('#cont_data').css('color','green');
			}
			controlla_registrazione();
		}
	});
	
	$('#citta').keyup(function() {
		if($('#citta').val() == ""){
			$('#cont_citta').html('Devi inserire la citt&agrave;');
			$('#cont_citta').css('color','red');
		} else {
			$('#cont_citta').html('Citta inserita');
			$('#cont_citta').css('color','green');
		}
		controlla_registrazione();
	});
	
	$('#occupazione').keyup(function() {
		if($('#occupazione').val() == ""){
			$('#cont_occupazione').html('Devi inserire il tuo lavoro');
			$('#cont_occupazione').css('color','red');
		} else {
			$('#cont_occupazione').html('Bel lavoro!');
			$('#cont_occupazione').css('color','green');
		}
		controlla_registrazione();
	});
	
	/*
	 * Evento scatenato dal click sul bottone di conferma registrazione
	 */
	$('#btn_conferma').click(function() {
		var continua = true;
		//if(($('#username').val() == "") )
		//Recupero tutti i dati da inviare al server
		var dati = {
			username: $('#username').val(),
			password: $('#password').val(),
			nome: $('#nome').val(),
			cognome: $('#cognome').val(),
			data: $('#data').val(),
			citta: $('#citta').val(),
			occupazione: $('#occupazione').val(),
		};
		//La richiesta ajax
		$.ajax({
			url: "../php/registrazione_utente.php",
			type: "POST",
			data: dati,
			dataType: "text",
			success: function (risposta) {	//Cosa faccio alla risposta del server?
				//$('#prova_risposta').html(risposta);
				if(risposta == "OK"){
					$.cookie('username', $('#username').val(), { path: '/' });
					$(window.location).attr('href', '../html/bacheca.html');
				} else {
					$(window.location).attr('href', '../html/errore.html');
				}
			}
		});
	});
});

function controlla_registrazione () {
	var abilita = true;
	
	if($('#cont_username').css('color') != "rgb(0, 128, 0)"){
		abilita = false;
	}
	if($('#cont_password').css('color') != "rgb(0, 128, 0)"){
		abilita = false;
	}
	if($('#cont_password2').css('color') != "rgb(0, 128, 0)"){
		abilita = false;
	}
	if($('#cont_nome').css('color') != "rgb(0, 128, 0)"){
		abilita = false;
	}
	if($('#cont_cognome').css('color') != "rgb(0, 128, 0)"){
		abilita = false;
	}
	if($('#cont_data').css('color') != "rgb(0, 128, 0)"){
		abilita = false;
	}
	if($('#cont_citta').css('color') != "rgb(0, 128, 0)"){
		abilita = false;
	}
	if($('#cont_occupazione').css('color') != "rgb(0, 128, 0)"){
		abilita = false;
	}
	
	//alert(abilita);
	
	if(abilita){
		$('#btn_conferma').removeAttr('disabled');
		//alert(abilita);
	} else {
		$('#btn_conferma').attr('disabled','disabled');
	}
	
};