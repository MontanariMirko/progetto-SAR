<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$return_arr = array();
	
	$username = mysql_real_escape_string($_POST['usr']);
	
	$query = "SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.amico 
				AND amici.tipo='a'
				AND amici.user='".$username."'
				UNION
				SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.amico
				AND amici.tipo='s'
				AND amici.user='".$username."'
				UNION
				SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.user
				AND amici.tipo='s'
				AND amici.amico='".$username."'";
	
	$result = mysql_query($query);
	
	while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
		$row_array['nome']=$row['nome'];
		$row_array['cognome']=$row['cognome'];
		$row_array['username']=$row['username'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr);
	
	mysql_close();
    
?>