<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	$nome = mysql_real_escape_string($_POST['nome']);
	$cognome = mysql_real_escape_string($_POST['cognome']);
	$data = mysql_real_escape_string($_POST['data']);
	$citta = mysql_real_escape_string($_POST['citta']);
	$occupazione = mysql_real_escape_string($_POST['lavoro']);
	
	//La query di inserimento
	$query = "UPDATE utenti SET nome='".$nome."',cognome='".$cognome."',data='".$data."',citta='".$citta."',occupazione='".$occupazione."' WHERE username='".$username."'";

	$result = mysql_query($query);
	
	//Controllo il risultato della query
	if(!$result){
		echo mysql_error();
	} else {
		echo "OK";
	}
	
	mysql_close();
    
?>