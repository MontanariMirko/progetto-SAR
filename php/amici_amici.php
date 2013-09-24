<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['usr']);
				
	//query che andrà a elencare i miei amici
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
	
	$amici = array();
	$vicini = array();
	$return_arr = array();
	while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
		$row_array['nome']=$row['nome'];
		$row_array['cognome']=$row['cognome'];
		$row_array['username']=$row['username'];
		array_push($amici,$row_array);
	}
	
	for($i=0; $i<count($amici); $i++){
		$usr = $amici[$i]['username'];
		//per ogni mio amico carico i suoi di amici
		$query = "SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.amico 
				AND amici.tipo='a'
				AND amici.user='".$usr."'
				UNION
				SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.amico
				AND amici.tipo='s'
				AND amici.user='".$usr."'
				UNION
				SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.user
				AND amici.tipo='s'
				AND amici.amico='".$usr."'";
		$result = mysql_query($query);
		while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
			$row_array['nome']=$row['nome'];
			$row_array['cognome']=$row['cognome'];
			$row_array['username']=$row['username'];
			//non aggiungo nell'array gli amici già caricati precedentemente
			if(!in_array($row_array, $vicini) && !in_array($row_array,$amici) && $username != $row_array['username'])
				array_push($vicini,$row_array);
		}
	}

	echo json_encode($vicini);
	
	mysql_close();
    
?>