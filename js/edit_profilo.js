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
			$('#nometitolo').html(risposta.nome+" "+risposta.cognome);
			$('#nome').val(risposta.nome);
			$('#cognome').val(risposta.cognome);
			$('#data').val(risposta.data);
			$('#citta').val(risposta.citta);
			$('#lavoro').val(risposta.occupazione);
		}
		});	
		
		//funzione per modificare i dati utente
		$('#modificadati').click(function(){
			var nome1 = $('#nome').val();
			var cognome1 = $('#cognome').val();
			var data1 = $('#data').val();
			var citta1 = $('#citta').val();
			var lavoro1 = $('#lavoro').val();
			if(nome1=="" || cognome1=="" || data1=="" || citta1=="" || lavoro1==""){
				$('#errore_dati').html('Completare tutti i campi');
				$('#errore_dati').css('color', 'red');
			}
			else{
				$.ajax({
					url: "../php/aggiorna_dati.php",
					type: "POST",
					data: {usr:$.cookie('username'), nome:nome1, cognome:cognome1, data:data1, citta:citta1, lavoro:lavoro1},
					dataType: "text",
					success: function (risposta) {	//Cosa faccio alla risposta del server?
						if(risposta=="OK"){
							location.reload();
						}
						else{
							$('#errore_dati').html("Errore durante l'aggiornamento");
							$('#errore_dati').css('color', 'red');
						}
					}
				});
			}
		});
		
		//funzione per modificare la password utente
		$('#modificapwd').click(function(){
			var newpwd1 = $('#newpwd1').val();
			var newpwd2 = $('#newpwd2').val();
			if(newpwd1 != newpwd2){
				$('#errore_pwd').html("Le password non coincidono");
				$('#errore_pwd').css('color', 'red');
				return;
			}
			if($('#newpwd1').val().length < 6){
				$('#errore_pwd').html("Password troppo corta");
				$('#errore_pwd').css('color', 'red');
				return;
			}
			$.ajax({
					url: "../php/aggiorna_pwd.php",
					type: "POST",
					data: {usr:$.cookie('username'), pwd:newpwd1},
					dataType: "text",
					success: function (risposta) {	//Cosa faccio alla risposta del server?
						if(risposta=="OK"){
							$('#errore_pwd').html('Password aggiornata');
							$('#errore_pwd').css('color', 'green');
						}
						else{
							$('#errore_pwd').html("Errore durante l'aggiornamento");
							$('#errore_pwd').css('color', 'red');
						}
					}
				});
			
		});
		
		//Il pannello che compare per selezionare la data
	$('#data').datepicker({
		changeMonth: true,		//Faccio scegliere il mese
		changeYear: true,		//Faccio scegliere l'anno
		dateFormat: "yy-mm-dd",	//Il formato
	});
});

function indietro(){
	$(window.location).attr('href', 'profilo.html?'+$.cookie('username'));
}
