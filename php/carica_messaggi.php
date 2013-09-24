<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$return_arr = array();
	
	$username = mysql_real_escape_string($_POST['username']);
	$amico = mysql_real_escape_string($_POST['amico']);
	
	
	$query = "SELECT u.nome, u.cognome, m.data, m.testo FROM messaggi m, utenti u WHERE (m.mitt = '".$username."' AND m.dest = '".$amico."' AND m.mitt = u.username) OR (m.dest = '".$username."' AND m.mitt = '".$amico."' AND m.mitt = u.username) ORDER BY data";
	$result = mysql_query($query);
	
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