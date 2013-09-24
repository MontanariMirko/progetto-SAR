<?php

$return_arr = array();

include 'config.php';

$term = mysql_real_escape_string($_GET['term']);

//cerca amici con nome uguale o simile a quello ricercato
$query = "SELECT username, nome, cognome FROM utenti WHERE nome LIKE '".$term."%' OR cognome LIKE '".$term."%' OR username LIKE '".$term."%'";
$result = mysql_query($query);
while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$row_array['value'] = $row['nome']." ".$row['cognome'];
	$row_array['id'] = $row['username'];
	array_push($return_arr,$row_array);
}

echo json_encode($return_arr);

mysql_close();

?>