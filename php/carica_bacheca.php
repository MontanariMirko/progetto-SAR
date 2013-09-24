<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$return_arr = array();
	
	$username = mysql_real_escape_string($_POST['username']);
	$data = mysql_real_escape_string($_POST['data']);
	
	
	$query = "SELECT utenti.nome as nome,utenti.cognome as cognome,bacheca.data as data,bacheca.testo as testo
				FROM amici,utenti,bacheca
				WHERE utenti.username=amici.amico 
				AND amici.tipo='a'
				AND amici.user='".$username."'
				AND bacheca.data > '".$data."' 
				AND bacheca.user=utenti.username 
				UNION
				SELECT utenti.nome as nome,utenti.cognome as cognome,bacheca.data as data,bacheca.testo as testo
				FROM amici,utenti,bacheca
				WHERE utenti.username=amici.amico
				AND amici.tipo='s'
				AND amici.user='".$username."'
				AND bacheca.data > '".$data."' 
				AND bacheca.user=utenti.username 
				UNION
				SELECT utenti.nome as nome,utenti.cognome as cognome,bacheca.data as data,bacheca.testo as testo
				FROM amici,utenti,bacheca
				WHERE utenti.username=amici.user
				AND amici.tipo='s'
				AND amici.amico='".$username."'
				AND bacheca.data > '".$data."' 
				AND bacheca.user=utenti.username
				UNION
				SELECT utenti.nome as nome,utenti.cognome as cognome,bacheca.data as data,bacheca.testo as testo
				FROM utenti,bacheca
				WHERE bacheca.user = '".$username."'
				AND bacheca.user = utenti.username
				AND bacheca.data > '".$data."'  
				ORDER BY data";
				
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