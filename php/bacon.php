<?php
    
    //File di configurazione del database
    include 'config.php';
	
	$username = mysql_real_escape_string($_POST['username']);
	$amico = mysql_real_escape_string($_POST['amico']);;
	
	if($username==$amico){
		echo "Numero di Bacon: 0";
		return;
	}
	//controllo che l'utente 1 esista
	$query = "SELECT username FROM utenti WHERE username='".$username."'";
	$result = mysql_query($query);
	$row = mysql_fetch_assoc($result);
	if(!$row['username']){
		echo "Errore 1";
		return;
	}
	//controllo che l'utente 2 esista
	$query = "SELECT username FROM utenti WHERE username='".$amico."'";
	$result = mysql_query($query);
	$row = mysql_fetch_assoc($result);
	if(!$row['username']){
		echo "Errore 2";
		return;
	}
	
	$vicini = array();
	array_push($vicini,$username);
	$cont = 1;
	$trovato = false;

	//ricerca ciclica del minor numero di amici in comune tra i due utenti
	while($trovato == false){
		$num = count($vicini);
		for($i=0; $i<$num;$i++){
			$username = $vicini[$i];
			$query = "SELECT utenti.username
						FROM amici,utenti
						WHERE utenti.username=amici.amico 
						AND amici.tipo='a'
						AND amici.user='".$username."'
						UNION
						SELECT utenti.username
						FROM amici,utenti
						WHERE utenti.username=amici.amico
						AND amici.tipo='s'
						AND amici.user='".$username."'
						UNION
						SELECT utenti.username
						FROM amici,utenti
						WHERE utenti.username=amici.user
						AND amici.tipo='s'
						AND amici.amico='".$username."'";
						
			$result = mysql_query($query);
			
			while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
				if(!in_array($row['username'],$vicini))
					array_push($vicini,$row['username']);
			}
		}
		if(in_array($amico,$vicini)){
			echo "Numero di Bacon: ".$cont;
			$trovato = true;
			return;
		}
		else {
			$cont++;
			if($cont>20){
				echo "Non esiste una relazione tra i due utenti.";
				return;
			}
		}
	}
	
	mysql_close();
    
?>