<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$return_arr = array();
	
	$username = mysql_real_escape_string($_POST['username']);

	$query = "(SELECT m.mitt AS utente, u.nome, u.cognome, m.letto_dest AS letto FROM messaggi m, utenti u WHERE m.dest='".$username."' AND m.mitt=u.username) UNION (SELECT m.dest as utente, u.nome, u.cognome, m.letto_mitt AS letto FROM messaggi m, utenti u WHERE m.mitt='".$username."' AND m.dest=u.username) ORDER BY utente, letto ASC";
	$result = mysql_query($query);
	
	$duplicati = array();
	
	while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
		if(!in_array($row['utente'], $duplicati)){
			$row_array['utente']=$row['utente'];
			$row_array['nome']=$row['nome'];
			$row_array['cognome']=$row['cognome'];
			$row_array['letto']=$row['letto'];
			array_push($return_arr,$row_array);
			array_push($duplicati, $row['utente']);
		}
	}

	echo json_encode($return_arr);
	
	mysql_close();
    
?>