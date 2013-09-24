<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$return_arr = array();
	
	$username = mysql_real_escape_string($_POST['usr']);
	
	//caricamento delle novità
	$query = "SELECT testo,data FROM novita WHERE user1='".$username."' OR user2='".$username."' GROUP BY data";
	$result = mysql_query($query);
	
	while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
		$row_array['testo']=$row['testo'];
		$row_array['data']=$row['data'];
		array_push($return_arr,$row_array);
	}
	
	//aggiornamento delle novità, ora sono state lette!
	$query = "UPDATE novita SET letto_user1='1' WHERE user1='".$username."' AND letto_user1=0";
	$result = mysql_query($query);
	$query = "UPDATE novita SET letto_user2='1' WHERE user2='".$username."' AND letto_user2=0";
	$result = mysql_query($query);
	
	echo json_encode($return_arr);
	
	mysql_close();
    
?>