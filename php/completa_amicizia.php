<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	$amico = mysql_real_escape_string($_POST['amico']);
	
	//La query di inserimento
	$query = "UPDATE amici SET tipo='s' WHERE (user='".$username."' AND amico='".$amico."') 
				OR (user='".$amico."' AND amico='".$username."')";

	$result = mysql_query($query);
	
	//query per aggiornare la tabelle delle novità
	$query = "SELECT nome,cognome FROM utenti WHERE username='".$username."'";
	$result = mysql_query($query);
	$row = mysql_fetch_assoc($result);
	$username_str = $row['nome']." ".$row['cognome'];
	$query = "SELECT nome,cognome FROM utenti WHERE username='".$amico."'";
	$result = mysql_query($query);
	$row = mysql_fetch_assoc($result);
	$amico_str = $row['nome']." ".$row['cognome'];
	$stringa = $username_str." e ".$amico_str." sono diventati amici.";
	$query = "INSERT INTO novita(user1,user2,data,testo,letto_user1,letto_user2) VALUES('".$username."','".$amico."',CURRENT_TIMESTAMP,'".$stringa."','0','0')";
	$result = mysql_query($query);
	
	if($result)
		echo "OK";
	else {
		echo "Errore";
	}
	
	mysql_close();
    
?>