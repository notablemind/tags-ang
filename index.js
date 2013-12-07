
var template = require('./template')
  , angular = require('angularjs')
  , keys = require('keys')

module.exports = angular.module('tags', [])
  .directive('tags', function(){
    return {
      scope: {},
      replace: true,
      restrict: 'A',
      template: template,
      link: function (scope, element, attrs) {
        var name = attrs.note;
        var localName = 'tags';
        scope.editing = false;
        scope.tags = ['one', 'two', 'three']
        scope.focused = false;

        scope.$parent.$watch(name, function(value) {
          if (!value) return
          scope[localName] = value;
        });
        scope.$watch(localName, function(value) {
          scope.$parent[name] = value;
        });
        scope.$watch('editing', function () {
          // WORK HERE
        })

        scope.midKey = keys({
          'backspace': function (e, i) {
            if (scope.tags[scope.editing].value.trim() !== '') return true
            scope.tags.splice(scope.editing, 1)
            if (scope.editing > 0) scope.editing -= 1
          }
        })
        scope.endKey = keys({
          'backspace': function (e) {
            if (scope.new_tag.trim() !== '') return true
            if (scope.tags.length === 0) return
            scope.editing = tags.length - 1
          },
          'tab': function () {
            scope.tags.push({value: scope.new_tag})
            scope.new_tag = ''
          },
          'shift tab': function (e) {
            scope.editing = scope.tags.length - 1
            if (scope.new_tag.trim() !== '') scope.tags.push({value: scope.new_tag})
            if (scope.editing < 0) scope.editing = 0
            scope.new_tag = scope.tags[scope.editing].value
          },
          'return': function () {
            if (scope.new_tag.trim() !== '') scope.tags.push({value: scope.new_tag})
            scope.editing = false
            scope.new_tag = ''
            // scope.focused = false
            // element.children('.end')[0].blur()
          },
          'escape': function () {
            if (scope.new_tag.trim() !== '') scope.tags.push({value: scope.new_tag})
            scope.focused = false
            element.children('.end')[0].blur()
          }
        })
        scope.edit = function (i) {
          scope.editing = i
        }
        scope.blurEnd = function () {
          scope.editing = false
          scope.focused = false
          if (scope.new_tag.trim() !== '') scope.tags.push({value: scope.new_tag})
          scope.new_tag = ''
        }
        scope.blurMid = function () {
          scope.editing = false
          scope.focused = false
          if (scope.new_tag.trim() !== '') scope.tags[scope.editing] = scope.new_tag
          else scope.tags.splice(scope.editing, 1)
          scope.new_tag = ''
        }
        scope.focus = function () {
          scope.focused = true
          scope.editing = false
          setTimeout(function () {
            element.children('.end')[0].focus()
          }, 0)
        }
      }
    };
  });


