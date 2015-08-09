<?php
$startTime = strtotime ( '-3 day' , strtotime ( time() ) ) ; 
	$date = new DateTime('Fri Aug 07 00:00:00 +1000 2015');
	echo $date->format('Y-m-d');
    
//echo(strtotime('Sun Aug 09 00:00:00 +1000 2015'));

?>