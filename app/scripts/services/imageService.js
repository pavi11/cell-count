var app = angular.module("UIApp");

app.factory("imageService", [ function () {

  var service = {};
  service.trainingImage = {};
  service.saveTrainingImageData = function (data) {
    service.trainingImage = data;
  }
  service.testImage = {};
  service.saveTestImageData = function (data) {
    service.testImage = data;
  }

  return service;
}]);
