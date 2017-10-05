!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v&&(c.default=c.__useDefault=v),f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.default;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["b"], ["c","d","e","f"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('b', ['d', 'e', 'c', 'f'], false, function ($__require, $__exports, $__module) {
  return (function ($, _, angular, Drop) {
    'use strict';

    function createAnnotationToolip(element, event) {
      var injector = angular.element(document).injector();
      var content = document.createElement('div');
      content.innerHTML = '<annotation-tooltip event="event"></annotation-tooltip>';

      injector.invoke(["$compile", "$rootScope", function ($compile, $rootScope) {
        var tmpScope = $rootScope.$new(true);
        tmpScope.event = event;

        $compile(content)(tmpScope);
        tmpScope.$digest();
        tmpScope.$destroy();

        var drop = new Drop({
          target: element[0],
          content: content,
          position: "bottom center",
          classes: 'drop-popover drop-popover--annotation',
          openOn: 'hover',
          hoverCloseDelay: 200,
          tetherOptions: {
            constraints: [{ to: 'window', pin: true, attachment: "both" }]
          }
        });

        drop.open();

        drop.on('close', function () {
          setTimeout(function () {
            drop.destroy();
          });
        });
      }]);
    }

    /*
     * jquery.flot.events
     *
     * description: Flot plugin for adding events/markers to the plot
     * version: 0.2.5
     * authors:
     *    Alexander Wunschik <alex@wunschik.net>
     *    Joel Oughton <joeloughton@gmail.com>
     *    Nicolas Joseph <www.nicolasjoseph.com>
     *
     * website: https://github.com/mojoaxel/flot-events
     *
     * released under MIT License and GPLv2+
     */

    /**
     * A class that allows for the drawing an remove of some object
     */
    var DrawableEvent = function (object, drawFunc, clearFunc, moveFunc, left, top, width, height) {
      var _object = object;
      var _drawFunc = drawFunc;
      var _clearFunc = clearFunc;
      var _moveFunc = moveFunc;
      var _position = { left: left, top: top };
      var _width = width;
      var _height = height;

      this.width = function () {
        return _width;
      };
      this.height = function () {
        return _height;
      };
      this.position = function () {
        return _position;
      };
      this.draw = function () {
        _drawFunc(_object);
      };
      this.clear = function () {
        _clearFunc(_object);
      };
      this.getObject = function () {
        return _object;
      };
      this.moveTo = function (position) {
        _position = position;
        _moveFunc(_object, _position);
      };
    };

    /**
     * Event class that stores options (eventType, min, max, title, description) and the object to draw.
     */
    var VisualEvent = function (options, drawableEvent) {
      var _parent;
      var _options = options;
      var _drawableEvent = drawableEvent;
      var _hidden = false;

      this.visual = function () {
        return _drawableEvent;
      };
      this.getOptions = function () {
        return _options;
      };
      this.getParent = function () {
        return _parent;
      };
      this.isHidden = function () {
        return _hidden;
      };
      this.hide = function () {
        _hidden = true;
      };
      this.unhide = function () {
        _hidden = false;
      };
    };

    /**
     * A Class that handles the event-markers inside the given plot
     */
    var EventMarkers = function (plot) {
      var _events = [];

      this._types = [];
      this._plot = plot;
      this.eventsEnabled = false;

      this.getEvents = function () {
        return _events;
      };

      this.setTypes = function (types) {
        return this._types = types;
      };

      /**
       * create internal objects for the given events
       */
      this.setupEvents = function (events) {
        var that = this;
        $.each(events, function (index, event) {
          var ve = new VisualEvent(event, that._buildDiv(event));
          _events.push(ve);
        });

        _events.sort(function (a, b) {
          var ao = a.getOptions(),
              bo = b.getOptions();
          if (ao.min > bo.min) {
            return 1;
          }
          if (ao.min < bo.min) {
            return -1;
          }
          return 0;
        });
      };

      /**
       * draw the events to the plot
       */
      this.drawEvents = function () {
        var that = this;
        // var o = this._plot.getPlotOffset();

        $.each(_events, function (index, event) {
          // check event is inside the graph range
          if (that._insidePlot(event.getOptions().min) && !event.isHidden()) {
            event.visual().draw();
          } else {
            event.visual().getObject().hide();
          }
        });
      };

      /**
       * update the position of the event-markers (e.g. after scrolling or zooming)
       */
      this.updateEvents = function () {
        var that = this;
        var o = this._plot.getPlotOffset(),
            left,
            top;
        var xaxis = this._plot.getXAxes()[this._plot.getOptions().events.xaxis - 1];

        $.each(_events, function (index, event) {
          top = o.top + that._plot.height() - event.visual().height();
          left = xaxis.p2c(event.getOptions().min) + o.left - event.visual().width() / 2;
          event.visual().moveTo({ top: top, left: left });
        });
      };

      /**
       * remove all events from the plot
       */
      this._clearEvents = function () {
        $.each(_events, function (index, val) {
          val.visual().clear();
        });
        _events = [];
      };

      /**
       * create a DOM element for the given event
       */
      this._buildDiv = function (event) {
        var that = this;

        var container = this._plot.getPlaceholder();
        var o = this._plot.getPlotOffset();
        var axes = this._plot.getAxes();
        var xaxis = this._plot.getXAxes()[this._plot.getOptions().events.xaxis - 1];
        var yaxis, top, left, color, markerSize, markerShow, lineStyle, lineWidth;
        var markerTooltip;

        // determine the y axis used
        if (axes.yaxis && axes.yaxis.used) {
          yaxis = axes.yaxis;
        }
        if (axes.yaxis2 && axes.yaxis2.used) {
          yaxis = axes.yaxis2;
        }

        // map the eventType to a types object
        var eventTypeId = event.eventType;

        if (this._types === null || !this._types[eventTypeId] || !this._types[eventTypeId].color) {
          color = '#666';
        } else {
          color = this._types[eventTypeId].color;
        }

        if (this._types === null || !this._types[eventTypeId] || !this._types[eventTypeId].markerSize) {
          markerSize = 8; //default marker size
        } else {
          markerSize = this._types[eventTypeId].markerSize;
        }

        if (this._types === null || !this._types[eventTypeId] || this._types[eventTypeId].markerShow === undefined) {
          markerShow = true;
        } else {
          markerShow = this._types[eventTypeId].markerShow;
        }

        if (this._types === null || !this._types[eventTypeId] || this._types[eventTypeId].markerTooltip === undefined) {
          markerTooltip = true;
        } else {
          markerTooltip = this._types[eventTypeId].markerTooltip;
        }

        if (this._types == null || !this._types[eventTypeId] || !this._types[eventTypeId].lineStyle) {
          lineStyle = 'dashed'; //default line style
        } else {
          lineStyle = this._types[eventTypeId].lineStyle.toLowerCase();
        }

        if (this._types == null || !this._types[eventTypeId] || this._types[eventTypeId].lineWidth === undefined) {
          lineWidth = 1; //default line width
        } else {
          lineWidth = this._types[eventTypeId].lineWidth;
        }

        top = o.top + this._plot.height();
        left = xaxis.p2c(event.min) + o.left;

        var line = $('<div class="events_line flot-temp-elem"></div>').css({
          "position": "absolute",
          "opacity": 0.8,
          "left": left + 'px',
          "top": 8,
          "width": lineWidth + "px",
          "height": this._plot.height(),
          "border-left-width": lineWidth + "px",
          "border-left-style": lineStyle,
          "border-left-color": color
        }).appendTo(container);

        if (markerShow) {
          var marker = $('<div class="events_marker"></div>').css({
            "position": "absolute",
            "left": -markerSize - Math.round(lineWidth / 2) + "px",
            "font-size": 0,
            "line-height": 0,
            "width": 0,
            "height": 0,
            "border-left": markerSize + "px solid transparent",
            "border-right": markerSize + "px solid transparent"
          }).appendTo(line);

          if (this._types[eventTypeId] && this._types[eventTypeId].position && this._types[eventTypeId].position.toUpperCase() === 'BOTTOM') {
            marker.css({
              "top": top - markerSize - 8 + "px",
              "border-top": "none",
              "border-bottom": markerSize + "px solid " + color
            });
          } else {
            marker.css({
              "top": "0px",
              "border-top": markerSize + "px solid " + color,
              "border-bottom": "none"
            });
          }

          marker.data({
            "event": event
          });

          var mouseenter = function () {
            createAnnotationToolip(marker, $(this).data("event"));
          };

          var mouseleave = function () {
            that._plot.clearSelection();
          };

          if (markerTooltip) {
            marker.css({ "cursor": "help" });
            marker.hover(mouseenter, mouseleave);
          }
        }

        var drawableEvent = new DrawableEvent(line, function drawFunc(obj) {
          obj.show();
        }, function (obj) {
          obj.remove();
        }, function (obj, position) {
          obj.css({
            top: position.top,
            left: position.left
          });
        }, left, top, line.width(), line.height());

        return drawableEvent;
      };

      /**
       * check if the event is inside visible range
       */
      this._insidePlot = function (x) {
        var xaxis = this._plot.getXAxes()[this._plot.getOptions().events.xaxis - 1];
        var xc = xaxis.p2c(x);
        return xc > 0 && xc < xaxis.p2c(xaxis.max);
      };
    };

    /**
     * initialize the plugin for the given plot
     */
    function init(plot) {
      /*jshint validthis:true */
      var that = this;
      var eventMarkers = new EventMarkers(plot);

      plot.getEvents = function () {
        return eventMarkers._events;
      };

      plot.hideEvents = function () {
        $.each(eventMarkers._events, function (index, event) {
          event.visual().getObject().hide();
        });
      };

      plot.showEvents = function () {
        plot.hideEvents();
        $.each(eventMarkers._events, function (index, event) {
          event.hide();
        });

        that.eventMarkers.drawEvents();
      };

      // change events on an existing plot
      plot.setEvents = function (events) {
        if (eventMarkers.eventsEnabled) {
          eventMarkers.setupEvents(events);
        }
      };

      plot.hooks.processOptions.push(function (plot, options) {
        // enable the plugin
        if (options.events.data != null) {
          eventMarkers.eventsEnabled = true;
        }
      });

      plot.hooks.draw.push(function (plot) {
        var options = plot.getOptions();

        if (eventMarkers.eventsEnabled) {
          // check for first run
          if (eventMarkers.getEvents().length < 1) {
            eventMarkers.setTypes(options.events.types);
            eventMarkers.setupEvents(options.events.data);
          } else {
            eventMarkers.updateEvents();
          }
        }

        eventMarkers.drawEvents();
      });
    }

    var defaultOptions = {
      events: {
        data: null,
        types: null,
        xaxis: 1,
        position: 'BOTTOM'
      }
    };

    $.plot.plugins.push({
      init: init,
      options: defaultOptions,
      name: "events",
      version: "0.2.5"
    });
  }).call(this, $__require('d'), $__require('e'), $__require('c'), $__require('f'));
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["angular","jquery","lodash","tether-drop"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("angular"), require("jquery"), require("lodash"), require("tether-drop"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});