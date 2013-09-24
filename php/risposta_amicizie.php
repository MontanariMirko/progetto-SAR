<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
	
	//La query di inserimento
	$query = "SELECT nome, cognome, amici.user
				FROM utenti, amici
				WHERE utenti.username = amici.user
				AND tipo =  'r'
				AND amici.amico =  '".$username."'";

	$result = mysql_query($query);
	
	$return_arr = array();
	
	while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
		$row_array['nome']=$row['nome'];
		$row_array['cognome']=$row['cognome'];
		$row_array['user']=$row['user'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr);
	
	mysql_close();
    
?>