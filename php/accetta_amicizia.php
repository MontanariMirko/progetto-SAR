<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	$amico = mysql_real_escape_string($_POST['amico']);
	$tipo = mysql_real_escape_string($_POST['tipo']);
	
	//La query di inserimento
	$query = "UPDATE amici SET tipo = '".$tipo."' WHERE user='".$username."' AND amico='".$amico."'";

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
	if($tipo == 'a')
		$stringa = $username_str." ha iniziato a seguire ".$amico_str.".";
	else if($tipo == 's')
		$stringa = $username_str." e ".$amico_str." sono diventati amici.";
	$query = "INSERT INTO novita(user1,user2,data,testo) VALUES('".$username."','".$amico."',CURRENT_TIMESTAMP,'".$stringa."')";
	$result = mysql_query($query);
	
	if($result)
		echo "OK";
	else {
		echo "Errore";
	}
	
	mysql_close();
    
?>