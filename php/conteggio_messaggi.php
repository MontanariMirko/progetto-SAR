<?php
	
	//File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['username']);
	
	//La query di inserimento
	$query ="SELECT COUNT(conta) AS num FROM (SELECT COUNT(DISTINCT mitt) AS conta FROM messaggi WHERE dest = '".$username."' AND letto_dest=0 GROUP BY mitt) AS a";

	$result = mysql_query($query);
	
	$row = mysql_fetch_assoc($result);
	
	echo $row['num'];
	
	mysql_close();
	
?>