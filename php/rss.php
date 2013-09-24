<?php
    require 'rss_php.php';
    $rss = new rss_php;
    $rss->load('feed.xml');
    $items = $rss->getItems();        
?> 

<?= '<ul id="ticker01">'; ?>
<?php foreach ($items as $item): ?>
<?php
	$dati = explode(" ",$item['pubDate']);
	$data = substr($dati[4], 0, -3);
   echo  '<li><span>'.$data.'</span><a href="'.$item['link'].'" target=blank>'.$item['title'].'</a></li>';
?>
<?php endforeach; ?>
<?= '</ul>'; ?>
