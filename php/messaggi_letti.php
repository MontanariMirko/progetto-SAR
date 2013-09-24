<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['username']);
	$amico = mysql_real_escape_string($_POST['amico']);
	
	//aggiornamento degli stati dopo aver letto i messaggi
	$query = "UPDATE messaggi SET letto_mitt = 1 WHERE (mitt = '".$username."' AND dest = '".$amico."')";
	$result = mysql_query($query);

	if($result){
		$query2 = "UPDATE messaggi SET letto_dest = 1 WHERE (dest = '".$username."' AND mitt = '".$amico."')";
		$result2 = mysql_query($query2);
		if($result2){
			echo "OK";
		}
		else {
			echo mysql_error();
		}
	}
	else {
		echo mysql_error();
	}
	
	mysql_close();
    
?>