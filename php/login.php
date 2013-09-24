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
	if(($password == "")){
		echo "Password non valida";
		return;
	} else {
		$password = md5($password);
	}

	//La query di inserimento
	$query = "SELECT username FROM utenti WHERE username='".$username."' AND password='".$password."'";

	$result = mysql_query($query);
	
	$row = mysql_fetch_assoc($result);
	
	//Controllo il risultato della query
	if($row['username'] == $username){
		echo "OK";
	} else {
		echo "Username o Password errati!";
	}
	
	mysql_close();
    
?>