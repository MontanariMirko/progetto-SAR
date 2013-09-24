<?php
    
    //File di configurazione del database
    include 'config.php';
	
	//Recupero tutti i dati inviatomi
	$username = mysql_real_escape_string($_POST['username']);
	if($username == "") {
		echo "Non hai inserito lo username";
		return;
	}
	
	$password = mysql_real_escape_string($_POST['password']);
	if(($password == "") || (strlen($password) < 6)){
		echo "Password non valida";
		return;
	} else {
		$password = md5($password);
	}
	
	$nome = mysql_real_escape_string($_POST['nome']);
	if($nome == "") {
		echo "Non hai inserito il nome";
		return;
	}
	
	$cognome = mysql_real_escape_string($_POST['cognome']);
	if($cognome == "") {
		echo "Non hai inserito il cognome";
		return;
	}
	
	$data = mysql_real_escape_string($_POST['data']);
	if($data == "") {
		echo "Non hai inserito la data";
		return;
	}
	
	$citta = mysql_real_escape_string($_POST['citta']);
	if($citta == "") {
		echo "Non hai inserito la citta";
		return;
	}
	
	$occupazione = mysql_real_escape_string($_POST['occupazione']);
	if($occupazione == "") {
		echo "Non hai inserito il lavoro";
		return;
	}
	
	//La query di inserimento
	$query = "INSERT INTO utenti VALUES ('".$username."', '".$password."', '".$nome."', '".$cognome."', '".$data."', '".$citta."', '".$occupazione."')";
	
	$result = mysql_query($query);
	
	//Controllo il risultato della query
	if(!$result){
		echo mysql_error();
	} else {
		echo "OK";
	}
	
	mysql_close();
    
?>