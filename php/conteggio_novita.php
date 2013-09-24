<?php
	
	//File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['username']);
	
	//La query di inserimento
	$query ="SELECT count(*) AS num FROM novita
			WHERE (user1='".$username."' AND letto_user1=0)
			OR (user2='".$username."' AND letto_user2=0)";

	$result = mysql_query($query);
	
	$row = mysql_fetch_assoc($result);
	
	echo $row['num'];
	
	mysql_close();
	
?>