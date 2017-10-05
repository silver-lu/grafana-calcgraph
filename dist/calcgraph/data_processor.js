'use strict';

System.register(['app/core/utils/kbn', 'lodash', 'moment', 'app/core/time_series2', 'app/core/core'], function (_export, _context) {
  "use strict";

  var kbn, _, moment, TimeSeries, colors, _createClass, DataProcessor;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_appCoreCore) {
      colors = _appCoreCore.colors;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('DataProcessor', DataProcessor = function () {
        function DataProcessor(panel) {
          _classCallCheck(this, DataProcessor);
        }

        _createClass(DataProcessor, [{
          key: 'getSeriesList',
          value: function getSeriesList(options) {
            var _this = this;

            if (!options.dataList || options.dataList.length === 0) {
              return [];
            }

            // auto detect xaxis mode
            var firstItem;
            if (options.dataList && options.dataList.length > 0) {
              firstItem = options.dataList[0];
              var autoDetectMode = this.getAutoDetectXAxisMode(firstItem);
              if (this.panel.xaxis.mode !== autoDetectMode) {
                this.panel.xaxis.mode = autoDetectMode;
                this.setPanelDefaultsForNewXAxisMode();
              }
            }

            switch (this.panel.xaxis.mode) {
              case 'series':
              case 'histogram':
              case 'time':
                {
                  return options.dataList.map(function (item, index) {
                    return _this.timeSeriesHandler(item, index, options);
                  });
                }
              case 'field':
                {
                  return this.customHandler(firstItem);
                }
            }
          }
        }, {
          key: 'getAutoDetectXAxisMode',
          value: function getAutoDetectXAxisMode(firstItem) {
            switch (firstItem.type) {
              case 'docs':
                return 'field';
              case 'table':
                return 'field';
              default:
                {
                  if (this.panel.xaxis.mode === 'series') {
                    return 'series';
                  }
                  if (this.panel.xaxis.mode === 'histogram') {
                    return 'histogram';
                  }
                  return 'time';
                }
            }
          }
        }, {
          key: 'setPanelDefaultsForNewXAxisMode',
          value: function setPanelDefaultsForNewXAxisMode() {
            switch (this.panel.xaxis.mode) {
              case 'time':
                {
                  this.panel.bars = false;
                  this.panel.lines = true;
                  this.panel.points = false;
                  this.panel.legend.show = true;
                  this.panel.tooltip.shared = true;
                  this.panel.xaxis.values = [];
                  break;
                }
              case 'series':
                {
                  this.panel.bars = true;
                  this.panel.lines = false;
                  this.panel.points = false;
                  this.panel.stack = false;
                  this.panel.legend.show = false;
                  this.panel.tooltip.shared = false;
                  this.panel.xaxis.values = ['total'];
                  break;
                }
              case 'histogram':
                {
                  this.panel.bars = true;
                  this.panel.lines = false;
                  this.panel.points = false;
                  this.panel.stack = false;
                  this.panel.legend.show = false;
                  this.panel.tooltip.shared = false;
                  break;
                }
            }
          }
        }, {
          key: 'timeSeriesHandler',
          value: function timeSeriesHandler(seriesData, index, options) {
            var datapoints = seriesData.datapoints || [];
            var alias = seriesData.target;

            var colorIndex = index % colors.length;
            var color = this.panel.aliasColors[alias] || colors[colorIndex];

            var series = new TimeSeries({ datapoints: datapoints, alias: alias, color: color, unit: seriesData.unit });

            if (datapoints && datapoints.length > 0) {
              var last = datapoints[datapoints.length - 1][1];
              var from = options.range.from;
              if (last - from < -10000) {
                series.isOutsideRange = true;
              }
            }

            return series;
          }
        }, {
          key: 'customHandler',
          value: function customHandler(dataItem) {
            var nameField = this.panel.xaxis.name;
            if (!nameField) {
              throw { message: 'No field name specified to use for x-axis, check your axes settings' };
            }
            return [];
          }
        }, {
          key: 'validateXAxisSeriesValue',
          value: function validateXAxisSeriesValue() {
            switch (this.panel.xaxis.mode) {
              case 'series':
                {
                  if (this.panel.xaxis.values.length === 0) {
                    this.panel.xaxis.values = ['total'];
                    return;
                  }

                  var validOptions = this.getXAxisValueOptions({});
                  var found = _.find(validOptions, { value: this.panel.xaxis.values[0] });
                  if (!found) {
                    this.panel.xaxis.values = ['total'];
                  }
                  return;
                }
            }
          }
        }, {
          key: 'getDataFieldNames',
          value: function getDataFieldNames(dataList, onlyNumbers) {
            if (dataList.length === 0) {
              return [];
            }

            var fields = [];
            var firstItem = dataList[0];
            var fieldParts = [];
            function getPropertiesRecursive(obj) {
              _.forEach(obj, function (value, key) {
                if (_.isObject(value)) {
                  fieldParts.push(key);
                  getPropertiesRecursive(value);
                } else {
                  if (!onlyNumbers || _.isNumber(value)) {
                    var field = fieldParts.concat(key).join('.');
                    fields.push(field);
                  }
                }
              });
              fieldParts.pop();
            }
            if (firstItem.type === 'docs') {
              if (firstItem.datapoints.length === 0) {
                return [];
              }
              getPropertiesRecursive(firstItem.datapoints[0]);
              return fields;
            }
          }
        }, {
          key: 'getXAxisValueOptions',
          value: function getXAxisValueOptions(options) {
            switch (this.panel.xaxis.mode) {
              case 'time':
                {
                  return [];
                }
              case 'series':
                {
                  return [{ text: 'Avg', value: 'avg' }, { text: 'Min', value: 'min' }, { text: 'Max', value: 'max' }, { text: 'Total', value: 'total' }, { text: 'Count', value: 'count' }];
                }
            }
          }
        }, {
          key: 'pluckDeep',
          value: function pluckDeep(obj, property) {
            var propertyParts = property.split('.');
            var value = obj;
            for (var i = 0; i < propertyParts.length; ++i) {
              if (value[propertyParts[i]]) {
                value = value[propertyParts[i]];
              } else {
                return undefined;
              }
            }
            return value;
          }
        }]);

        return DataProcessor;
      }());

      _export('DataProcessor', DataProcessor);
    }
  };
});
//# sourceMappingURL=data_processor.js.map
