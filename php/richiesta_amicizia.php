<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	$amico = mysql_real_escape_string($_POST['amico']);
	
	//La query di inserimento
	$query = "INSERT INTO amici(user,amico,tipo) VALUES ('".$username."', '".$amico."', 'r')";

	$result = mysql_query($query);
	
	if($result)
		echo "OK";
	else {
		echo "Errore";
	}
	
	mysql_close();
    
?>