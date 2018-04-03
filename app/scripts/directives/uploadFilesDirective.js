

var app = angular.module("UIApp");

app.directive("uploadFiles", ["imageService", "$rootScope", function (imageService, $rootScope) {
  return {
    link: function (scope, element, attr) {
      scope.fileread = [];
      var datas = [] ;

      element.bind("change", function (changeEvent) {
        if(changeEvent.target.className === 'inputfile') {
          var readers = [],
            files = changeEvent.target.files;
          var fileLoadedCount = 0;
          var dateObj = new Date();
          for (var i = 0; i < files.length; i++) {
            readers[i] = new FileReader();
            readers[i].index = i;
            readers[i].onload = function (loadEvent) {
              var index = loadEvent.target.index;
              // scope.fileread.push(loadEvent.target.result);
              datas.push({
                lastModified: files[index].lastModified,
                lastModifiedDate: files[index].lastModifiedDate,
                name: files[index].name,
                size: files[index].size,
                type: getFileExtension(files[index].name, files[index].type),
                data: loadEvent.target.result,
                fileName : files[index].name,
                fileUploadTimeInMS : dateObj.getTime()
            });
              fileLoadedCount += 1;
              if (fileLoadedCount === files.length) {
                if(changeEvent.target.className === 'inputfile'){
                  imageLoaded();
                }
              }
            };
            readers[i].readAsDataURL(files[i]);
          }
        }
      });

      var getFileExtension = function (name, type) {
        var types = ['png', 'jpg', 'jpeg', 'tif', 'tiff', 'bmp'];
        var imgExt = 'tiff';
        angular.forEach(types, function (ext, index) {
          if(type.indexOf(ext) >= 0 || name.indexOf(ext) >= 0){
            imgExt = ext;
          }
        });
        return imgExt;
      };

      var imageLoaded = function () {
        imageService.saveTrainingImageData(datas[0]);
        $rootScope.$broadcast('training.image.data', datas[0]);
        datas = [];
      };
    }
  }
}]);
