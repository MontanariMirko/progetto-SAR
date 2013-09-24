<?php

$return_arr = array();

include 'config.php';

$term = mysql_real_escape_string($_GET['term']);
$username = mysql_real_escape_string($_GET['username']);

$query = "SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.amico 
				AND amici.tipo='a'
				AND amici.user='".$username."'
				AND (utenti.nome LIKE '".$term."%' OR utenti.cognome LIKE '".$term."%' OR utenti.username LIKE '".$term."%')
				UNION
				SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.amico
				AND amici.tipo='s'
				AND amici.user='".$username."'
				AND (utenti.nome LIKE '".$term."%' OR utenti.cognome LIKE '".$term."%' OR utenti.username LIKE '".$term."%')
				UNION
				SELECT utenti.nome,utenti.cognome,utenti.username
				FROM amici,utenti
				WHERE utenti.username=amici.user
				AND amici.tipo='s'
				AND amici.amico='".$username."'
				AND (utenti.nome LIKE '".$term."%' OR utenti.cognome LIKE '".$term."%' OR utenti.username LIKE '".$term."%')";
$result = mysql_query($query);
while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$row_array['value'] = $row['nome']." ".$row['cognome'];
	$row_array['id'] = $row['username'];
	array_push($return_arr,$row_array);
}

echo json_encode($return_arr);

mysql_close();

?>