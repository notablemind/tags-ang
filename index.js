
var template = require('template');

var ng = {
  deps: {},
  directive: {
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
  }
};

module.exports = ng;

