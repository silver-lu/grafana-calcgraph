!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v&&(c.default=c.__useDefault=v),f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.default;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], ["c","d","e"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('a', ['c', 'd', 'e'], false, function ($__require, $__exports, $__module) {
  return (function (angular, jquery, _) {
    'use strict';

    var module = angular.module('grafana.controllers');

    module.controller('SeriesOverridesCtrl', function ($scope, $element, popoverSrv) {
      $scope.overrideMenu = [];
      $scope.currentOverrides = [];
      $scope.override = $scope.override || {};

      $scope.addOverrideOption = function (name, propertyName, values) {
        var option = {};
        option.text = name;
        option.propertyName = propertyName;
        option.index = $scope.overrideMenu.length;
        option.values = values;

        option.submenu = _.map(values, function (value) {
          return { text: String(value), value: value };
        });

        $scope.overrideMenu.push(option);
      };

      $scope.setOverride = function (item, subItem) {
        // handle color overrides
        if (item.propertyName === 'color') {
          $scope.openColorSelector();
          return;
        }

        $scope.override[item.propertyName] = subItem.value;

        // automatically disable lines for this series and the fill bellow to series
        // can be removed by the user if they still want lines
        if (item.propertyName === 'fillBelowTo') {
          $scope.override['lines'] = false;
          $scope.ctrl.addSeriesOverride({ alias: subItem.value, lines: false });
        }

        $scope.updateCurrentOverrides();
        $scope.ctrl.render();
      };

      $scope.colorSelected = function (color) {
        $scope.override['color'] = color;
        $scope.updateCurrentOverrides();
        $scope.ctrl.render();
      };

      $scope.openColorSelector = function () {
        popoverSrv.show({
          element: $element.find(".dropdown")[0],
          position: 'top center',
          openOn: 'click',
          template: '<gf-color-picker></gf-color-picker>',
          model: {
            autoClose: true,
            colorSelected: $scope.colorSelected
          },
          onClose: function () {
            $scope.ctrl.render();
          }
        });
      };

      $scope.removeOverride = function (option) {
        delete $scope.override[option.propertyName];
        $scope.updateCurrentOverrides();
        $scope.ctrl.refresh();
      };

      $scope.getSeriesNames = function () {
        return _.map($scope.ctrl.seriesList, function (series) {
          return series.alias;
        });
      };

      $scope.updateCurrentOverrides = function () {
        $scope.currentOverrides = [];
        _.each($scope.overrideMenu, function (option) {
          var value = $scope.override[option.propertyName];
          if (_.isUndefined(value)) {
            return;
          }
          $scope.currentOverrides.push({
            name: option.text,
            propertyName: option.propertyName,
            value: String(value)
          });
        });
      };

      $scope.addOverrideOption('Bars', 'bars', [true, false]);
      $scope.addOverrideOption('Lines', 'lines', [true, false]);
      $scope.addOverrideOption('Line fill', 'fill', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      $scope.addOverrideOption('Line width', 'linewidth', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      $scope.addOverrideOption('Null point mode', 'nullPointMode', ['connected', 'null', 'null as zero']);
      $scope.addOverrideOption('Fill below to', 'fillBelowTo', $scope.getSeriesNames());
      $scope.addOverrideOption('Staircase line', 'steppedLine', [true, false]);
      $scope.addOverrideOption('Dashes', 'dashes', [true, false]);
      $scope.addOverrideOption('Dash Length', 'dashLength', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
      $scope.addOverrideOption('Dash Space', 'spaceLength', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
      $scope.addOverrideOption('Points', 'points', [true, false]);
      $scope.addOverrideOption('Points Radius', 'pointradius', [1, 2, 3, 4, 5]);
      $scope.addOverrideOption('Stack', 'stack', [true, false, 'A', 'B', 'C', 'D']);
      $scope.addOverrideOption('Color', 'color', ['change']);
      $scope.addOverrideOption('Y-axis', 'yaxis', [1, 2]);
      $scope.addOverrideOption('Z-index', 'zindex', [-3, -2, -1, 0, 1, 2, 3]);
      $scope.addOverrideOption('Transform', 'transform', ['negative-Y']);
      $scope.addOverrideOption('Legend', 'legend', [true, false]);
      $scope.updateCurrentOverrides();
    });
  }).call(this, $__require('c'), $__require('d'), $__require('e'));
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["angular","jquery","lodash"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("angular"), require("jquery"), require("lodash"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});