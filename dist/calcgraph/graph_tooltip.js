!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v&&(c.default=c.__useDefault=v),f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.default;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["10"], ["12","d"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('10', ['d', '12'], false, function ($__require, $__exports, $__module) {
  return (function ($, core) {
    'use strict';

    var appEvents = core.appEvents;

    function GraphTooltip(elem, dashboard, scope, getSeriesFn) {
      var self = this;
      var ctrl = scope.ctrl;
      var panel = ctrl.panel;

      var $tooltip = $('<div class="graph-tooltip">');

      this.destroy = function () {
        $tooltip.remove();
      };

      this.findHoverIndexFromDataPoints = function (posX, series, last) {
        var ps = series.datapoints.pointsize;
        var initial = last * ps;
        var len = series.datapoints.points.length;
        for (var j = initial; j < len; j += ps) {
          // Special case of a non stepped line, highlight the very last point just before a null point
          if (!series.lines.steps && series.datapoints.points[initial] != null && series.datapoints.points[j] == null ||
          //normal case
          series.datapoints.points[j] > posX) {
            return Math.max(j - ps, 0) / ps;
          }
        }
        return j / ps - 1;
      };

      this.findHoverIndexFromData = function (posX, series) {
        var lower = 0;
        var upper = series.data.length - 1;
        var middle;
        while (true) {
          if (lower > upper) {
            return Math.max(upper, 0);
          }
          middle = Math.floor((lower + upper) / 2);
          if (series.data[middle][0] === posX) {
            return middle;
          } else if (series.data[middle][0] < posX) {
            lower = middle + 1;
          } else {
            upper = middle - 1;
          }
        }
      };

      this.renderAndShow = function (absoluteTime, innerHtml, pos, xMode) {
        if (xMode === 'time') {
          innerHtml = '<div class="graph-tooltip-time">' + absoluteTime + '</div>' + innerHtml;
        }
        $tooltip.html(innerHtml).place_tt(pos.pageX + 20, pos.pageY);
      };

      this.getMultiSeriesPlotHoverInfo = function (seriesList, pos) {
        var value, i, series, hoverIndex, hoverDistance, pointTime, yaxis;
        // 3 sub-arrays, 1st for hidden series, 2nd for left yaxis, 3rd for right yaxis.
        var results = [[], [], []];

        //now we know the current X (j) position for X and Y values
        var last_value = 0; //needed for stacked values

        var minDistance, minTime;

        for (i = 0; i < seriesList.length; i++) {
          series = seriesList[i];

          if (!series.data.length || panel.legend.hideEmpty && series.allIsNull) {
            // Init value so that it does not brake series sorting
            results[0].push({ hidden: true, value: 0 });
            continue;
          }

          if (!series.data.length || panel.legend.hideZero && series.allIsZero) {
            // Init value so that it does not brake series sorting
            results[0].push({ hidden: true, value: 0 });
            continue;
          }

          hoverIndex = this.findHoverIndexFromData(pos.x, series);
          hoverDistance = pos.x - series.data[hoverIndex][0];
          pointTime = series.data[hoverIndex][0];

          // Take the closest point before the cursor, or if it does not exist, the closest after
          if (!minDistance || hoverDistance >= 0 && (hoverDistance < minDistance || minDistance < 0) || hoverDistance < 0 && hoverDistance > minDistance) {
            minDistance = hoverDistance;
            minTime = pointTime;
          }

          if (series.stack) {
            if (panel.tooltip.value_type === 'individual') {
              value = series.data[hoverIndex][1];
            } else if (!series.stack) {
              value = series.data[hoverIndex][1];
            } else {
              last_value += series.data[hoverIndex][1];
              value = last_value;
            }
          } else {
            value = series.data[hoverIndex][1];
          }

          // Highlighting multiple Points depending on the plot type
          if (series.lines.steps || series.stack) {
            // stacked and steppedLine plots can have series with different length.
            // Stacked series can increase its length on each new stacked serie if null points found,
            // to speed the index search we begin always on the last found hoverIndex.
            hoverIndex = this.findHoverIndexFromDataPoints(pos.x, series, hoverIndex);
          }

          // Be sure we have a yaxis so that it does not brake series sorting
          yaxis = 0;
          if (series.yaxis) {
            yaxis = series.yaxis.n;
          }

          results[yaxis].push({
            value: value,
            hoverIndex: hoverIndex,
            color: series.color,
            label: series.label,
            time: pointTime,
            distance: hoverDistance,
            index: i
          });
        }

        // Contat the 3 sub-arrays
        results = results[0].concat(results[1], results[2]);

        // Time of the point closer to pointer
        results.time = minTime;

        return results;
      };

      elem.mouseleave(function () {
        if (panel.tooltip.shared) {
          var plot = elem.data().plot;
          if (plot) {
            $tooltip.detach();
            plot.unhighlight();
          }
        }
        appEvents.emit('graph-hover-clear');
      });

      elem.bind("plothover", function (event, pos, item) {
        self.show(pos, item);

        // broadcast to other graph panels that we are hovering!
        pos.panelRelY = (pos.pageY - elem.offset().top) / elem.height();
        appEvents.emit('graph-hover', { pos: pos, panel: panel });
      });

      elem.bind("plotclick", function (event, pos, item) {
        appEvents.emit('graph-click', { pos: pos, panel: panel, item: item });
      });

      this.clear = function (plot) {
        $tooltip.detach();
        plot.clearCrosshair();
        plot.unhighlight();
      };

      this.show = function (pos, item) {
        var plot = elem.data().plot;
        var plotData = plot.getData();
        var xAxes = plot.getXAxes();
        var xMode = xAxes[0].options.mode;
        var seriesList = getSeriesFn();
        var allSeriesMode = panel.tooltip.shared;
        var group, value, absoluteTime, hoverInfo, i, series, seriesHtml, tooltipFormat;

        // if panelRelY is defined another panel wants us to show a tooltip
        // get pageX from position on x axis and pageY from relative position in original panel
        if (pos.panelRelY) {
          var pointOffset = plot.pointOffset({ x: pos.x });
          if (Number.isNaN(pointOffset.left) || pointOffset.left < 0 || pointOffset.left > elem.width()) {
            self.clear(plot);
            return;
          }
          pos.pageX = elem.offset().left + pointOffset.left;
          pos.pageY = elem.offset().top + elem.height() * pos.panelRelY;
          var isVisible = pos.pageY >= $(window).scrollTop() && pos.pageY <= $(window).innerHeight() + $(window).scrollTop();
          if (!isVisible) {
            self.clear(plot);
            return;
          }
          plot.setCrosshair(pos);
          allSeriesMode = true;

          if (dashboard.sharedCrosshairModeOnly()) {
            // if only crosshair mode we are done
            return;
          }
        }

        if (seriesList.length === 0) {
          return;
        }

        if (seriesList[0].hasMsResolution) {
          tooltipFormat = 'YYYY-MM-DD HH:mm:ss.SSS';
        } else {
          tooltipFormat = 'YYYY-MM-DD HH:mm:ss';
        }

        if (allSeriesMode) {
          plot.unhighlight();

          var seriesHoverInfo = self.getMultiSeriesPlotHoverInfo(plotData, pos);

          seriesHtml = '';

          absoluteTime = dashboard.formatDate(seriesHoverInfo.time, tooltipFormat);

          // Dynamically reorder the hovercard for the current time point if the
          // option is enabled.
          if (panel.tooltip.sort === 2) {
            seriesHoverInfo.sort(function (a, b) {
              return b.value - a.value;
            });
          } else if (panel.tooltip.sort === 1) {
            seriesHoverInfo.sort(function (a, b) {
              return a.value - b.value;
            });
          }

          for (i = 0; i < seriesHoverInfo.length; i++) {
            hoverInfo = seriesHoverInfo[i];

            if (hoverInfo.hidden) {
              continue;
            }

            var highlightClass = '';
            if (item && hoverInfo.index === item.seriesIndex) {
              highlightClass = 'graph-tooltip-list-item--highlight';
            }

            series = seriesList[hoverInfo.index];

            value = series.formatValue(hoverInfo.value);

            seriesHtml += '<div class="graph-tooltip-list-item ' + highlightClass + '"><div class="graph-tooltip-series-name">';
            seriesHtml += '<i class="fa fa-minus" style="color:' + hoverInfo.color + ';"></i> ' + hoverInfo.label + ':</div>';
            seriesHtml += '<div class="graph-tooltip-value">' + value + '</div></div>';
            plot.highlight(hoverInfo.index, hoverInfo.hoverIndex);
          }

          self.renderAndShow(absoluteTime, seriesHtml, pos, xMode);
        }
        // single series tooltip
        else if (item) {
            series = seriesList[item.seriesIndex];
            group = '<div class="graph-tooltip-list-item"><div class="graph-tooltip-series-name">';
            group += '<i class="fa fa-minus" style="color:' + item.series.color + ';"></i> ' + series.label + ':</div>';

            if (panel.stack && panel.tooltip.value_type === 'individual') {
              value = item.datapoint[1] - item.datapoint[2];
            } else {
              value = item.datapoint[1];
            }

            value = series.formatValue(value);

            absoluteTime = dashboard.formatDate(item.datapoint[0], tooltipFormat);

            group += '<div class="graph-tooltip-value">' + value + '</div>';

            self.renderAndShow(absoluteTime, group, pos, xMode);
          }
          // no hit
          else {
              $tooltip.detach();
            }
      };
    }

    return GraphTooltip;
  }).call(this, $__require('d'), $__require('12'));
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["app/core/core","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("app/core/core"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});