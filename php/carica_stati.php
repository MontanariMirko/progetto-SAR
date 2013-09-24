<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	
	//caricamento della bacheca
	$query = "SELECT nome,cognome,bacheca.data,bacheca.testo FROM bacheca,utenti WHERE user='".$username."' AND bacheca.user=utenti.username ORDER BY bacheca.data";

	$result = mysql_query($query);

	$return_arr = array();
	
	while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
		$row_array['nome']=$row['nome'];
		$row_array['cognome']=$row['cognome'];
		$row_array['data']=$row['data'];
		$row_array['testo']=$row['testo'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr);
	
	mysql_close();
    
?>