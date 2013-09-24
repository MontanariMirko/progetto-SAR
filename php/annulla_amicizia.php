<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	$amico = mysql_real_escape_string($_POST['amico']);
	$genere = mysql_real_escape_string($_POST['gen']);
	
	$query = "SELECT nome,cognome FROM utenti WHERE username='".$username."'";
	$result = mysql_query($query);
	$row = mysql_fetch_assoc($result);
	$username_str = $row['nome']." ".$row['cognome'];
	$query = "SELECT nome,cognome FROM utenti WHERE username='".$amico."'";
	$result = mysql_query($query);
	$row = mysql_fetch_assoc($result);
	$amico_str = $row['nome']." ".$row['cognome'];
	
	//controllo se devo aggiornare la tabella o cancellarla, in base al tipo di amicizia
	if($genere == 's'){
		$query1 = "DELETE FROM amici
				WHERE (user='".$username."' AND amico='".$amico."') OR (user='".$amico."' AND amico='".$username."')";
		$result1 = mysql_query($query1);
		if($result1)
			$query = "INSERT INTO amici(user,amico,tipo) VALUES ('".$amico."', '".$username."', 'a')";
		//inserimento notizia
		$stringa = $amico_str." ha iniziato a seguire ".$username_str.".";
		$query_nov = "INSERT INTO novita(user1,user2,data,testo,letto_user1,letto_user2) VALUES('".$username."','".$amico."',CURRENT_TIMESTAMP,'".$stringa."','0','0')";
		$result = mysql_query($query_nov);
	}
	else if($genere == 'a'){
		$query = "DELETE FROM amici
				WHERE (user='".$username."' AND amico='".$amico."') OR (user='".$amico."' AND amico='".$username."')
				 AND tipo='a'";
		$stringa = $amico_str." e ".$username_str." non sono pi&ugrave; amici.";
		$query_nov = "INSERT INTO novita(user1,user2,data,testo,letto_user1,letto_user2) VALUES('".$username."','".$amico."',CURRENT_TIMESTAMP,'".$stringa."','0','0')";
		$result = mysql_query($query_nov);
	}

	$result = mysql_query($query);

	if($result)
		echo "OK";
	else {
		echo "Errore";
	}
	
	mysql_close();
    
?>