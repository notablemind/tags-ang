
/* globals angular: true */

var template = require('./template')
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
        scope.tags = [{value: 'one'}, {value: 'two'}, {value: 'three'}]
        scope.focused = false;
        scope.new_tag = ''

        scope.$parent.$watch(name, function(value) {
          if (!value) return
          scope[localName] = value;
        });
        scope.$watch(localName, function(value) {
          scope.$parent[name] = value;
        });
        scope.$watch('editing', function (value) {
          if ('undefined' === typeof value) return
          if (false === scope.focused) return
          if (false === value) return setTimeout(function () {
            element[0].querySelectorAll('.end')[0].focus()
          }, 0)
          setTimeout(function () {
            var tag = element[0].querySelectorAll('.tag')[value]
            if (!tag) return console.error('cant focus', value)
            tag.getElementsByTagName('input')[0].focus()
          }, 0)
        })

        scope.inWidth = function (value) {
          return {width: 20 + 7*(value.length > 3 ? value.length + 1 : 4) + 'px'}
        }

        scope.midKey = keys({
          'backspace': function (e, i) {
            if (scope.tags[scope.editing].value.trim() !== '') return true
            scope.tags.splice(scope.editing, 1)
            if (scope.editing > 0) scope.editing -= 1
          },
          'shift tab': function (e) {
            if (scope.tags[scope.editing].value.trim() === '') scope.tags.splice(scope.editing, 1)
            scope.editing -= 1
            if (scope.editing < 0) scope.editing = 0
          },
          'tab': function () {
            if (scope.tags[scope.editing].value.trim() === '') scope.tags.splice(scope.editing, 1)
            else scope.editing += 1
            if (scope.editing >= scope.tags.length) scope.editing = false
          },
          'return': function () {
            if (scope.tags[scope.editing].value.trim() === '') scope.tags.splice(scope.editing, 1)
            scope.editing = false
            scope.new_tag = ''
          },
          'escape': function () {
            if (scope.tags[scope.editing].value.trim() === '') scope.tags.splice(scope.editing, 1)
            scope.editing = false
            scope.focused = false
          }
        })
        scope.endKey = keys({
          'backspace': function (e) {
            if (scope.new_tag.trim() !== '') return true
            if (scope.tags.length === 0) return
            scope.editing = scope.tags.length - 1
          },
          'tab': function () {
            if (!scope.new_tag.trim().length) return
            scope.tags.push({value: scope.new_tag})
            scope.new_tag = ''
          },
          'shift tab': function (e) {
            scope.editing = scope.tags.length - 1
            if (scope.new_tag.trim() !== '') scope.tags.push({value: scope.new_tag})
            if (scope.editing < 0) scope.editing = 0
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
        scope.remove = function (i) {
          scope.tags.splice(i, 1)
          scope.editing = false
          scope.focused = false
        }
        scope.edit = function (i) {
          scope.editing = i
          scope.focused = true
        }
        scope.blurEnd = function () {
          if (scope.editing) return
          if (scope.new_tag.trim() !== '') scope.tags.push({value: scope.new_tag})
          scope.editing = false
          scope.focused = false
          scope.new_tag = ''
        }
        scope.blurMid = function (i) {
          if (scope.editing !== i) return
          if (!scope.tags[scope.editing].value.trim().length) scope.tags.splice(scope.editing, 1)
          scope.editing = false
          scope.focused = false
          scope.new_tag = ''
        }
        scope.focus = function () {
          scope.focused = true
          scope.editing = false
          setTimeout(function () {
            element[0].querySelectorAll('.end')[0].focus()
          }, 0)
        }
      }
    };
  });


