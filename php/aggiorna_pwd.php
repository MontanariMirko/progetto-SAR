<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	$pwd = md5(mysql_real_escape_string($_POST['pwd']));

	
	//La query di inserimento
	$query = "UPDATE utenti SET password='".$pwd."' WHERE username='".$username."'";

	$result = mysql_query($query);
	
	//Controllo il risultato della query
	if(!$result){
		echo mysql_error();
	} else {
		echo "OK";
	}
	
	mysql_close();
    
?>