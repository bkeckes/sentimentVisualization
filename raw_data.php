<?php


require("functions.php");
$timezones = array();

//header('Content-Type: application/json; charset=utf-8');
$jsonurl = "http://wefeel.csiro.au/api/zones/continents/europe/timezones";
$json = file_get_contents($jsonurl);
$content = json_decode($json, true);


foreach($content as $cont){
	$id = $cont['id'];
	$timezones[$id] = new Timezone($cont['id'], $cont['name']);
}


foreach($timezones as $city){
	//$city = $timezones['berlin'];
	$startTime = strtotime("-3 days")*1000;
	$jsonurl = "http://wefeel.csiro.au/api/emotions/primary/timepoints?granularity=day&continent=europe&timezone=" .$city->getId() . "&start=".$startTime; //TODO: Berechnung des Timestamp
	$json = file_get_contents($jsonurl);
	$days = json_decode($json, true);
	$dayCount=0;
	foreach($days as $day => $value){
		$date = new DateTime($value['localStart']['start']);
		$city->addDay($dayCount, new Day($date->format('d/m/Y')));
			
		foreach($value['counts'] as $feeling => $count){
			$city->getDay($dayCount)->addFeeling(transformFeeling($feeling), transformFeelingMeasure($count));
		}
		$dayCount++;
	}
	//var_dump($content);
}
$classCalculator = new ClassCalculator;

$classCalc[0]['min']=100;
$classCalc[0]['max']=0;
$classCalc[1]['min']=100;
$classCalc[1]['max']=0;
$classCalc[2]['min']=100;
$classCalc[2]['max']=0;

foreach($timezones as $city){
	for($i = 0; $i <= 2; $i++){
		if($classCalc[$i]['min'] > $city->getDay($i)->getSentimentIndex()){
			$classCalc[$i]['min'] = $city->getDay($i)->getSentimentIndex();
		}
		if($classCalc[$i]['max'] < $city->getDay($i)->getSentimentIndex()){
			$classCalc[$i]['max'] = $city->getDay($i)->getSentimentIndex();
		}
	}
}

$analyse = new Analyse($timezones);
$analyse->setMaxMinSentimentIndex(0, $classCalc[0]['max'], $classCalc[0]['min']);
$analyse->setMaxMinSentimentIndex(1, $classCalc[1]['max'], $classCalc[1]['min']);
$analyse->setMaxMinSentimentIndex(2, $classCalc[2]['max'], $classCalc[2]['min']);

echo("Daten wurden neu geladen. <a href='index.html'>Zur&uuml;k zur Tabelle</a>");
file_put_contents ( 'data.json' , json_encode($analyse) );


	//var_dump ($cont);
	//echo ($cont['name']);
	//echo($timezones[$id]->getId());
//}
//$jsonurl = "http://wefeel.csiro.au/api/emotions/primary/timepoints?granularity=day&continent=europe&timezone=amsterdam&start=1438600640000";
/*file_put_contents($json, file_get_contents($jsonurl));
$zone = new Timezone;
$zone->addDay(0,new Day);
$zone->getDay(0)->addFeeling('joy',123);
//$zone->addDay(1,'b');


echo $zone->getDay(0)->getFeeling('joy');
*/

//echo json_encode($content);

?>