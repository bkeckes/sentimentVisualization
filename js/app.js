'use strict';


var app = angular.module('emotionApp', ['ngRoute'])
  .factory('Emotion', function() {
 
    
    return {
      getZone: function() {
		return timezones;
      }
    };
  })
 
  
  
  .controller('siteController', function($scope, $http, Emotion) {
	$http.get('data.json').then(function(articlesResponse) {
      $scope.timezones = articlesResponse.data.timezones;
	  $scope.maxSentiment = getMaxValue(articlesResponse.data.maxSentimentIndex);
	  $scope.minSentiment = getMinValue(articlesResponse.data.minSentimentIndex);
	  angular.forEach($scope.timezones, function(value, key) {		
		for(var $i=0; $i<3; $i++){
			value.days[$i].sentimentIndex = value.days[$i].feelings['positive'] / value.days[$i].feelings['negative'];
			value.days[$i].sentimentClass = getColor($scope.maxSentiment, $scope.minSentiment, value.days[$i].sentimentIndex);
		}
	  });
    });
	$scope.addCircle = function($city, $color, $index){
		var address = $city;
		var geocoder = new google.maps.Geocoder();
				
		//console.log($city+' '+getLocation($city, 'lat')+' - '+getLocation($city, 'lng'));
		$scope.circle[$scope.circleCount++] = L.circle([getLocation($city, 'lat'), getLocation($city, 'lng')], 150000, {
			color: 'transparent',
			fillColor: $color,
			fillOpacity: 0.8
		}).addTo(map);
		
		$scope.circle[$scope.circleCount-1].bindPopup("<b>"+$city + "</b>: " + Math.round($index * 100) / 100);
		//alert($city);	
		
		//console.log($scope.circle[$scope.circleCount-1]);
		
		
		
	}
	
	$scope.circle = new Array();
	$scope.circleCount=0;
	
      $scope.day = {
        index: '2'
      };
	  $scope.change = function() {
		//remove all circles
		for(var i=0; i<$scope.circleCount; i++)
			map.removeLayer($scope.circle[i])
		
		angular.forEach($scope.timezones, function(value, key) {
			$scope.addCircle(value.id, value.days[$scope.day.index].sentimentClass, value.days[$scope.day.index].sentimentIndex)
		
		  });
		
      };
	  
	 
    })

  ;
 // function ctrl($scope){
    // $scope.getDisplayName = function(columnName) {        
        // return 'abc';
    // };
// }
// app.directive('abcOption', function($compile,$timeout) {
    // return {
        // restrict : 'asd',
        // template : '<div class="filter-content">ssss</div>',
        // replace : true,
        // scope : {
            // callBackMethod:'&getDisplayName'
        // },
        // link: function(scope,element,attrs){            
            // /* send an object to the function */
            // console.log(scope.callBackMethod({columnName:"hurray"}));           
        // }
    // };
// });
  
/**
	Aus Performancegruenden hart codiert.
**/
function getLocation($city, $index){
	
	var lat=0, lng=0;
	if($city=="belgrade"){ lat=44.786568; lng=20.44892159999995;}
	else if($city=="berlin"){ lat=52.52000659999999; lng=13.404953999999975;}
	else if($city=="bern"){ lat=46.9479222; lng=7.444608499999958;}
	else if($city=="bratislava"){ lat=48.1458923; lng=17.107137299999977;}
	else if($city=="brussels"){ lat=50.8503396; lng=4.351710300000036;}
	else if($city=="bucharest"){ lat=44.4267674; lng=26.102538399999958;}
	else if($city=="budapest"){ lat=47.497912; lng=19.04023499999994;}
	else if($city=="copenhagen"){ lat=55.6760968; lng=12.568337100000008;}
	else if($city=="amsterdam"){ lat=52.3702157; lng=4.895167899999933;}
	else if($city=="athens"){ lat=37.983917; lng=23.729359899999963;}
	else if($city=="azores"){ lat=37.7412488; lng=-25.675594400000023;}
	else if($city=="helenski"){ lat=46.0537167; lng=16.53164620000007;}
	else if($city=="istanbul"){ lat=41.0082376; lng=28.97835889999999;}
	else if($city=="volograd"){ lat=48.708048; lng=44.51330340000004;}
	else if($city=="edinburgh"){ lat=55.953252; lng=-3.188266999999996;}
	else if($city=="kyiv"){ lat=50.4501; lng=30.523400000000038;}
	else if($city=="lisbon"){ lat=38.7222524; lng=-9.139336599999979;}
	else if($city=="ljubljana"){ lat=46.0569465; lng=14.505751499999974;}
	else if($city=="london"){ lat=51.5073509; lng=-0.12775829999998223;}
	else if($city=="madrid"){ lat=40.4167754; lng=-3.7037901999999576;}
	else if($city=="minsk"){ lat=53.90453979999999; lng=27.561524400000053;}
	else if($city=="moscow"){ lat=55.755826; lng=37.6173;}
	else if($city=="paris"){ lat=48.856614; lng=2.3522219000000177;}
	else if($city=="prague"){ lat=50.0755381; lng=14.43780049999998;}
	else if($city=="dublin"){ lat=53.3498053; lng=-6.260309699999993;}
	else if($city=="zagreb"){ lat=45.8150108; lng=15.981919000000062;}
	else if($city=="riga"){ lat=56.9496487; lng=24.10518639999998;}
	else if($city=="rome"){ lat=41.9027835; lng=12.496365500000024;}
	else if($city=="sarajevo"){ lat=43.8562586; lng=18.413076300000057;}
	else if($city=="skorpje"){ lat=41.9973462; lng=21.42799560000003;}
	else if($city=="sofia"){ lat=42.4900487; lng=23.380712899999935;}
	else if($city=="stPetersburg"){ lat=27.7518284; lng=-82.6267345;}
	else if($city=="stockholm"){ lat=59.32932349999999; lng=18.068580800000063;}
	else if($city=="tallinn"){ lat=59.43696079999999; lng=24.75357459999998;}
	else if($city=="vienna"){ lat=48.2081743; lng=16.37381890000006;}
	else if($city=="vilnius"){ lat=54.6871555; lng=25.279651400000034;}
	else if($city=="warsaw"){ lat=52.2296756; lng=21.012228700000037;}
	
	if($index=='lat')
		return lat;
	else
		return lng;
	
}

function getColor($max, $min, $index) {
    var rainbow = new Rainbow();
	rainbow.setSpectrum('yellow', 'green');
	rainbow.setNumberRange($min, $max);
	//rainbow.setNumberRange(0, 10);
	return '#' + rainbow.colourAt($index );
}  
function getMinValue($values){
	var $min=1000;
	for(var $i=0; $i<$values.length; $i++){
		if($values[$i]<$min)
			$min = $values[$i];
	}
	return $min;
}
function getMaxValue($values){
	var $max=0;
	for(var $i=0; $i<$values.length; $i++){
		if($values[$i]>$max)
			$max = $values[$i];
	}
	return $max;
}
  