<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$mitt = mysql_real_escape_string($_POST['mitt']);
	$dest = mysql_real_escape_string($_POST['dest']);
	$testo = mysql_real_escape_string($_POST['testo']);
	
	//La query di inserimento
	$query = "INSERT INTO messaggi VALUES ('".$mitt."', '".$dest."', CURRENT_TIMESTAMP, '".$testo."', 1, 0)";

	$result = mysql_query($query);
	
	if(!$result){
		echo mysql_error();
	} else {
		echo "OK";
	}	

	mysql_close();
    
?>