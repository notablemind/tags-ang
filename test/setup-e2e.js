
var tags = require('tags')

angular.module('test', ['tags'])
  .factory('$exceptionHandler', function () {
    return function (exception, cause) {
      exception.message += ' (caused by "' + cause + '")';
      throw exception;
    };
  })
  .controller('Tester', ['$scope', function ($scope) {
    $scope.tags = ['one', 'two', 'three']
  }]);

