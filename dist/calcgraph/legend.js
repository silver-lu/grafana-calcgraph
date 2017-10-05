!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v&&(c.default=c.__useDefault=v),f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.default;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["11"], ["c","d","13","14","e"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('11', ['c', 'e', 'd', '13', '14'], false, function ($__require, $__exports, $__module) {
  return (function (angular, _, $) {
    'use strict';

    var module = angular.module('grafana.directives');

    module.directive('graphLegend', function (popoverSrv, $timeout) {

      return {
        link: function (scope, elem) {
          var $container = $('<section class="graph-legend"></section>');
          var firstRender = true;
          var ctrl = scope.ctrl;
          var panel = ctrl.panel;
          var data;
          var seriesList;
          var i;

          ctrl.events.on('render', function () {
            data = ctrl.seriesList;
            if (data) {
              render();
            }
          });

          function getSeriesIndexForElement(el) {
            return el.parents('[data-series-index]').data('series-index');
          }

          function openColorSelector(e) {
            // if we clicked inside poup container ignore click
            if ($(e.target).parents('.popover').length) {
              return;
            }

            var el = $(e.currentTarget).find('.fa-minus');
            var index = getSeriesIndexForElement(el);
            var series = seriesList[index];

            $timeout(function () {
              popoverSrv.show({
                element: el[0],
                position: 'bottom center',
                template: '<gf-color-picker></gf-color-picker>',
                openOn: 'hover',
                model: {
                  series: series,
                  toggleAxis: function () {
                    ctrl.toggleAxis(series);
                  },
                  colorSelected: function (color) {
                    ctrl.changeSeriesColor(series, color);
                  }
                }
              });
            });
          }

          function toggleSeries(e) {
            var el = $(e.currentTarget);
            var index = getSeriesIndexForElement(el);
            var seriesInfo = seriesList[index];
            var scrollPosition = $($container.children('tbody')).scrollTop();
            ctrl.toggleSeries(seriesInfo, e);
            $($container.children('tbody')).scrollTop(scrollPosition);
          }

          function sortLegend(e) {
            var el = $(e.currentTarget);
            var stat = el.data('stat');

            if (stat !== panel.legend.sort) {
              panel.legend.sortDesc = null;
            }

            // if already sort ascending, disable sorting
            if (panel.legend.sortDesc === false) {
              panel.legend.sort = null;
              panel.legend.sortDesc = null;
              render();
              return;
            }

            panel.legend.sortDesc = !panel.legend.sortDesc;
            panel.legend.sort = stat;
            render();
          }

          function getTableHeaderHtml(statName) {
            if (!panel.legend[statName]) {
              return "";
            }
            var html = '<th class="pointer" data-stat="' + statName + '">' + statName;

            if (panel.legend.sort === statName) {
              var cssClass = panel.legend.sortDesc ? 'fa fa-caret-down' : 'fa fa-caret-up';
              html += ' <span class="' + cssClass + '"></span>';
            }

            return html + '</th>';
          }

          function render() {
            if (!ctrl.panel.legend.show) {
              elem.empty();
              firstRender = true;
              return;
            }

            if (firstRender) {
              elem.append($container);
              $container.on('click', '.graph-legend-icon', openColorSelector);
              $container.on('click', '.graph-legend-alias', toggleSeries);
              $container.on('click', 'th', sortLegend);
              firstRender = false;
            }

            seriesList = data;

            $container.empty();

            // Set min-width if side style and there is a value, otherwise remove the CSS propery
            var width = panel.legend.rightSide && panel.legend.sideWidth ? panel.legend.sideWidth + "px" : "";
            $container.css("min-width", width);

            $container.toggleClass('graph-legend-table', panel.legend.alignAsTable === true);

            var tableHeaderElem;
            if (panel.legend.alignAsTable) {
              var header = '<tr>';
              header += '<th colspan="2" style="text-align:left"></th>';
              if (panel.legend.values) {
                header += getTableHeaderHtml('min');
                header += getTableHeaderHtml('max');
                header += getTableHeaderHtml('avg');
                header += getTableHeaderHtml('current');
                header += getTableHeaderHtml('total');
              }
              header += '</tr>';
              tableHeaderElem = $(header);
            }

            if (panel.legend.sort) {
              seriesList = _.sortBy(seriesList, function (series) {
                return series.stats[panel.legend.sort];
              });
              if (panel.legend.sortDesc) {
                seriesList = seriesList.reverse();
              }
            }

            var seriesShown = 0;
            var seriesElements = [];

            for (i = 0; i < seriesList.length; i++) {
              var series = seriesList[i];

              if (series.hideFromLegend(panel.legend)) {
                continue;
              }

              var html = '<div class="graph-legend-series';

              if (series.yaxis === 2) {
                html += ' graph-legend-series--right-y';
              }
              if (ctrl.hiddenSeries[series.alias]) {
                html += ' graph-legend-series-hidden';
              }
              html += '" data-series-index="' + i + '">';
              html += '<div class="graph-legend-icon">';
              html += '<i class="fa fa-minus pointer" style="color:' + series.color + '"></i>';
              html += '</div>';

              html += '<a class="graph-legend-alias pointer" title="' + _.escape(series.label) + '">' + _.escape(series.label) + '</a>';

              if (panel.legend.values) {
                var avg = series.formatValue(series.stats.avg);
                var current = series.formatValue(series.stats.current);
                var min = series.formatValue(series.stats.min);
                var max = series.formatValue(series.stats.max);
                var total = series.formatValue(series.stats.total);

                if (panel.legend.min) {
                  html += '<div class="graph-legend-value min">' + min + '</div>';
                }
                if (panel.legend.max) {
                  html += '<div class="graph-legend-value max">' + max + '</div>';
                }
                if (panel.legend.avg) {
                  html += '<div class="graph-legend-value avg">' + avg + '</div>';
                }
                if (panel.legend.current) {
                  html += '<div class="graph-legend-value current">' + current + '</div>';
                }
                if (panel.legend.total) {
                  html += '<div class="graph-legend-value total">' + total + '</div>';
                }
              }

              html += '</div>';
              seriesElements.push($(html));

              seriesShown++;
            }

            if (panel.legend.alignAsTable) {
              var maxHeight = ctrl.height;

              if (!panel.legend.rightSide) {
                maxHeight = maxHeight / 2;
              }

              var topPadding = 6;
              var tbodyElem = $('<tbody></tbody>');
              tbodyElem.css("max-height", maxHeight - topPadding);
              tbodyElem.append(tableHeaderElem);
              tbodyElem.append(seriesElements);
              $container.append(tbodyElem);
            } else {
              $container.append(seriesElements);
            }
          }
        }
      };
    });
  }).call(this, $__require('c'), $__require('e'), $__require('d'), $__require('13'), $__require('14'));
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["angular","jquery","jquery.flot","jquery.flot.time","lodash"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("angular"), require("jquery"), require("jquery.flot"), require("jquery.flot.time"), require("lodash"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});