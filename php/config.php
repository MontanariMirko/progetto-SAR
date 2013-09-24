<?php
	$dbhost = "localhost";
	$dbuser = "socialuni";
	$dbpass = "ottobre";
	$dbname = "my_socialuni";
	
	$conn = mysql_connect($dbhost,$dbuser,$dbpass) or die("Errore connessione");
	mysql_select_db($dbname);
?>