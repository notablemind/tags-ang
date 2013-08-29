
var template = require('./template')
  , angular = require('angularjs');

module.exports = angular.module('tags', [])
  .directive(function(){
    return {
      scope: {},
      replace: true,
      restrict: 'A',
      template: template,
      link: function (scope, element, attrs) {
        var name = attrs.note;
        var localName = 'tags';
        scope.$parent.$watch(name, function(value) {
          scope[localName] = value;
        });
        scope.$watch(localName, function(value) {
          scope.$parent[name] = value;
        });
      }
    };
  });


