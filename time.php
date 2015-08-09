<?php

	//$city = $timezones['berlin'];
	$startTime = strtotime("-3 days")*1000;
	$jsonurl = "http://wefeel.csiro.au/api/emotions/primary/timepoints?granularity=day&continent=europe&timezone=berlin&start=".$startTime; //TODO: Berechnung des Timestamp
	echo $jsonurl . "<br>";
	$json = file_get_contents($jsonurl);
	$days = json_decode($json, true);
	$dayCount=0;
	foreach($days as $day => $value){
		$start = $value['localStart'];
		$date = new DateTime($value['localStart']['start']);
		echo $date->format('d/m/Y')."<br>";
			
		
	}
   
//echo(strtotime('Sun Aug 09 00:00:00 +1000 2015'));

?>