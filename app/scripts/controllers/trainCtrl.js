'use strict';

angular.module("UIApp").
controller("trainCtrl", ['$scope', '$http', function($scope, $http){

  var trainPath = '';
  var testPath = '';

  $scope.inputUrl = '';
    $scope.param = [];
    $scope.count = -1;

    $scope.segment = function(request) {
      $http.post("api/segment",request);
    }
    $scope.train = function(){
      $http.post("api/train",trainPath);
    }
    $scope.test = function(){
      // $scope.segment(testPath);
      $http.get("http://127.0.0.1:8000/cellcount/predict?filename="+testPath).then(function(response){
        $scope.count = response.data;
      });
    }

  $scope.loadImg = function(event) {
    var output = document.getElementById('can');
    var context = output.getContext('2d');
    var input = event.target;
    trainPath = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      var imageObj = new Image();
      imageObj.src = dataURL;
      imageObj.onload=function(){
        context.drawImage(imageObj,0,0,output.width,output.height);
      }
    }
    reader.readAsDataURL(input.files[0]);
  }

  $scope.loadImg2 = function(event) {
    var output = document.getElementById('can2');
    var context = output.getContext('2d');
    var input = event.target;
    testPath = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      var imageObj = new Image();
      imageObj.src = dataURL;
      imageObj.onload=function(){
        context.drawImage(imageObj,0,0,output.width,output.height);
      }
    }
    reader.readAsDataURL(input.files[0]);
  }

  $scope.$on('training.image.data', function (event, data){
    console.log(data)
    var output = document.getElementById('can');
    var context = output.getContext('2d');
    var imageObj = new Image();
    imageObj.src = data.data;
    imageObj.onload=function(){
      context.drawImage(imageObj,0,0,output.width,output.height);
    }
  });

}]);






