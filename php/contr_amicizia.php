<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	$amico = mysql_real_escape_string($_POST['amico']);
	
	//La query di inserimento
	$query = "SELECT * 
				FROM amici 
				WHERE (user='".$username."' AND amico='".$amico."') OR (user='".$amico."' AND amico='".$username."') ";

	$result = mysql_query($query);
	
	$row = mysql_fetch_assoc($result);
	
	//echo $row['nome']." ".$row['cognome'];
	echo json_encode($row);
	mysql_close();
    
?>