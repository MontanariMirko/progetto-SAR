<?php
    
    //File di configurazione del database
    include 'config.php';
	
	//Recupero lo username
	$username = mysql_real_escape_string($_POST['username']);
	
	//Faccio la query per vedere se esite
	$query = "SELECT COUNT(*) AS value FROM utenti WHERE username = '".$username."'";
	$result = mysql_query($query);
	$count = mysql_fetch_row($result);
	
	//E lo comunico
	echo $count[0];
	
	mysql_close();
  
?>