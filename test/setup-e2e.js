
var tags = require('tags')

angular.module('test', ['tags'])
  .controller('Tester', ['$scope', function ($scope) {
    $scope.tags = [{value: 'one'}, {value: 'two'}, {value: 'three'}]
  }]);

