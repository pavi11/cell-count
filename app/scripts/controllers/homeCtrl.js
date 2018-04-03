'use strict';

angular.module("UIApp").
controller("homeCtrl", ['$scope', '$location', 'sharedService', function($scope, $location, sharedService){
	$scope.connectDial = function(){
			$location.path("/connect");
		};

	$scope.navigate = function(feature){
      sharedService.updateFeature(feature);
			$location.path("/features");
		};
	}]);
