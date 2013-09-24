<html>
	<head>
<title>Social Uni - Rete sociale</title>

    <link rel="stylesheet" href="../css/jquery.jOrgChart.css"/>

    <link rel="stylesheet" href="../css/li-scroller.css" type="text/css" media="screen" /> 
		<link rel="stylesheet" href="../css/custom.css" type="text/css" media="screen" /> 

    <script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="../js/jquery.cookie.js"></script>
    <script type="text/javascript" src="../js/jquery.li-scroller.1.0.js"></script>	
    <script src="../js/jquery.jOrgChart.js"></script>

    <script>
    jQuery(document).ready(function() {
        $("#org").jOrgChart({
            chartElement : '#chart',
        });
        //controllo dei cookie
		if($.cookie('username') == null){
			$(window.location).attr('href', '../index.html');
		}
		//caricamento dati rss			
		$.post('../php/rss.php', function(data) {
		  $('#news').html(data);
		  //caricamento funzione per far scorrere le notizie
		  $("ul#ticker01").liScroll();
		});	
    });
    </script>
  </head>

		<body style="margin:0px;">
  <div style="background-color:#339966; padding:5px;  height:30px" id="news">
  </div>
  <div align="center" style="margin-top:40px">
  	<ul id="org" style="display:none">
<?php
$url = $_SERVER["REQUEST_URI"];
$var = parse_url($url);
$username = $var["query"];

include 'config.php';

$query = "SELECT nome,cognome FROM utenti WHERE username='".$username."'";
$result = mysql_query($query);
$row = mysql_fetch_assoc($result);
echo "<li>".$row['nome']." ".$row['cognome']."\n";
	
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
echo "<ul>\n";
	while ($row= mysql_fetch_array($result,MYSQL_ASSOC)) {
		echo "<li>".$row['nome']." ".$row['cognome']."\n";
		$username = $row['username'];
		$query1 = "SELECT utenti.nome,utenti.cognome,utenti.username
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
			$result1 = mysql_query($query1);
			echo "<ul>\n";
			while ($row1= mysql_fetch_array($result1,MYSQL_ASSOC)) {
				echo "<li>".$row1['nome']." ".$row1['cognome']."</li>\n";
			}
			echo "</li></ul>\n";
	}
	echo "</li></ul>\n";
?>
</ul>
    <div id="chart" class="orgChart"></div>
    </div>
    <br><br>
    <p align="center">
    	<a href="../html/bacheca.html" style="color:black">Torna alla bacheca</a>
    </p>
</body>
</html>