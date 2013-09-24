<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['user']);
	$testo = mysql_real_escape_string($_POST['testo']);
	
	//La query di inserimento
	$query = "INSERT INTO bacheca VALUES ('".$username."', CURRENT_TIMESTAMP, '".$testo."')";

	$result = mysql_query($query);
	
	if(!$result){
		echo mysql_error();
	} else {
		echo "OK";
	}	

	mysql_close();
    
?>