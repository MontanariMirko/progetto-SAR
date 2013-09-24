<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['username']);
	
	//La query di inserimento
	$query = "SELECT COUNT(*) as num FROM amici WHERE amico =  '".$username."' AND tipo='r' GROUP BY amico";

	$result = mysql_query($query);
	
	$row = mysql_fetch_assoc($result);
	
	echo $row['num'];
	mysql_close();
    
?>