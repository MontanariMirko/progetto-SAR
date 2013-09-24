<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	
	//La query di inserimento
	$query = "SELECT * FROM utenti WHERE username='".$username."'";

	$result = mysql_query($query);
	
	$row = mysql_fetch_assoc($result);
	
	//echo $row['nome']." ".$row['cognome'];
	echo json_encode($row);
	mysql_close();
    
?>