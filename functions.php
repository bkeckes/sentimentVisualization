
<?php
class Timezone {
    var $days;  
	var $name;
	var $id;
	
    function addDay($index, $day) {
        $this->days[$index] = $day;
    }
	
	function getDay($index){
		return $this->days[$index];
	}
	
	function Timezone($id, $city) {
		$this->id = $id;
		$this->name=$city;
	}
	
	function getName(){
		return $this->name;
	}
	
	function getId(){
		return $this->id;
	}
}
class Day {
    var $feelings;
	var $time;
	
    function addFeeling($name, $num) {
        $this->feelings[$name] = $num;
    }
	
	function getFeeling($name){
		return $this->feelings[$name];
	}
	
	function getSentimentIndex(){
		return round($this->feelings['positive'] / $this->feelings['negative'],3);
	}
	function Day($time){
		$this->time=$time;
	}
	
}
class Analyse{
	var $timezones;
	var $maxSentimentIndex;
	var $minSentimentIndex;
	
	function Analyse($timezones){
		$this->timezones=$timezones;
	}
	function setMaxMinSentimentIndex($day, $max, $min){
		$this->maxSentimentIndex[$day] = $max;
		$this->minSentimentIndex[$day] = $min;
	}
}
class ClassCalculator{
	var $min;
	var $max;
	
}

function transformFeeling($key){
	switch($key){
		case "joy": return "positive";
		case "love": return "positive";
		case "*": return "neutral";
		case "surprise": return "positive";
		case "anger": return "negative";
		case "other": return "neutral";
		case "sadness": return "negative";
		case "fear": return "negative";
		default: return $key;
	}
}

//TODO
function transformFeelingMeasure($value){
	switch($value){
		case "joy": $a = 1;
		case "love": $a = 1.2;
		case "*": $a = 1;
		case "surprise": $a = 1;
		case "anger": $a = 1;
		case "other": $a = 1;
		case "sadness": $a = 1;
		case "fear": $a = 1.2;
		default: $a = 1;
	}
	
	return $value * $a;
}
?>
