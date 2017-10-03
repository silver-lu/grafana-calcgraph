'use strict';

System.register(['./graph', './legend', './series_overrides_ctrl', './thresholds_form', './template', 'angular', 'moment', 'lodash', 'app/core/time_series2', 'app/core/config', 'app/plugins/sdk', './data_processor', './axes_editor'], function (_export, _context) {
  "use strict";

  var template, angular, moment, _, TimeSeries, config, MetricsPanelCtrl, alertTab, DataProcessor, axesEditorComponent, _createClass, _get, panelDefaults, GraphCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_graph) {}, function (_legend) {}, function (_series_overrides_ctrl) {}, function (_thresholds_form) {}, function (_template) {
      template = _template.default;
    }, function (_angular) {
      angular = _angular.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_appCoreConfig) {
      config = _appCoreConfig.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
      alertTab = _appPluginsSdk.alertTab;
    }, function (_data_processor) {
      DataProcessor = _data_processor.DataProcessor;
    }, function (_axes_editor) {
      axesEditorComponent = _axes_editor.axesEditorComponent;
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

      _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      panelDefaults = {
        // datasource name, null = default datasource
        datasource: null,
        // sets client side (flot) or native graphite png renderer (png)
        renderer: 'flot',
        yaxes: [{
          label: null,
          show: true,
          logBase: 1,
          min: null,
          max: null,
          format: 'short'
        }, {
          label: null,
          show: true,
          logBase: 1,
          min: null,
          max: null,
          format: 'short'
        }],
        xaxis: {
          show: true,
          mode: 'time',
          name: null,
          values: [],
          buckets: null
        },
        // show/hide lines
        lines: true,
        // fill factor
        fill: 1,
        // line width in pixels
        linewidth: 1,
        // show/hide dashed line
        dashes: false,
        // length of a dash
        dashLength: 10,
        // length of space between two dashes
        spaceLength: 10,
        // show hide points
        points: false,
        // point radius in pixels
        pointradius: 5,
        // show hide bars
        bars: false,
        // enable/disable stacking
        stack: false,
        // stack percentage mode
        percentage: false,
        // legend options
        legend: {
          show: true, // disable/enable legend
          values: false, // disable/enable legend values
          min: false,
          max: false,
          current: false,
          total: false,
          avg: false
        },
        // how null points should be handled
        nullPointMode: 'null',
        // staircase line mode
        steppedLine: false,
        // tooltip options
        tooltip: {
          value_type: 'individual',
          shared: true,
          sort: 0
        },
        // time overrides
        timeFrom: null,
        timeShift: null,
        // metric queries
        targets: [{}],
        // series color overrides
        aliasColors: {},
        // other style overrides
        seriesOverrides: [],
        thresholds: []
      };

      _export('PanelCtrl', _export('GraphCtrl', GraphCtrl = function (_MetricsPanelCtrl) {
        _inherits(GraphCtrl, _MetricsPanelCtrl);

        /** @ngInject */
        function GraphCtrl($scope, $injector, annotationsSrv) {
          _classCallCheck(this, GraphCtrl);

          var _this = _possibleConstructorReturn(this, (GraphCtrl.__proto__ || Object.getPrototypeOf(GraphCtrl)).call(this, $scope, $injector));

          _this.template = template;

          _this.hiddenSeries = {};
          _this.seriesList = [];
          _this.dataList = [];
          _this.annotations = [];
          _this.colors = [];

          _.defaults(_this.panel, _this.panelDefaults);
          _.defaults(_this.panel.tooltip, _this.panelDefaults.tooltip);
          _.defaults(_this.panel.legend, _this.panelDefaults.legend);
          _.defaults(_this.panel.xaxis, _this.panelDefaults.xaxis);

          _this.processor = new DataProcessor(_this.panel);

          _this.events.on('render', _this.onRender.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('data-error', _this.onDataError.bind(_this));
          _this.events.on('data-snapshot-load', _this.onDataSnapshotLoad.bind(_this));
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_this));
          return _this;
        }

        _createClass(GraphCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Axes', axesEditorComponent, 2);
            this.addEditorTab('Legend', 'public/app/plugins/panel/graph/tab_legend.html', 3);
            this.addEditorTab('Display', 'public/app/plugins/panel/graph/tab_display.html', 4);

            if (config.alertingEnabled) {
              this.addEditorTab('Alert', alertTab, 5);
            }

            this.subTabIndex = 0;
          }
        }, {
          key: 'onInitPanelActions',
          value: function onInitPanelActions(actions) {
            actions.push({ text: 'Export CSV', click: 'ctrl.exportCsv()' });
            actions.push({ text: 'Toggle legend', click: 'ctrl.toggleLegend()' });
          }
        }, {
          key: 'issueQueries',
          value: function issueQueries(datasource) {
            this.annotationsPromise = this.annotationsSrv.getAnnotations({
              dashboard: this.dashboard,
              panel: this.panel,
              range: this.range
            });
            return _get(GraphCtrl.prototype.__proto__ || Object.getPrototypeOf(GraphCtrl.prototype), 'issueQueries', this).call(this, datasource);
          }
        }, {
          key: 'zoomOut',
          value: function zoomOut(evt) {
            this.publishAppEvent('zoom-out', 2);
          }
        }, {
          key: 'onDataSnapshotLoad',
          value: function onDataSnapshotLoad(snapshotData) {
            this.annotationsPromise = this.annotationsSrv.getAnnotations({
              dashboard: this.dashboard,
              panel: this.panel,
              range: this.range
            });
            this.onDataReceived(snapshotData);
          }
        }, {
          key: 'onDataError',
          value: function onDataError(err) {
            this.seriesList = [];
            this.annotations = [];
            this.render([]);
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            var _this2 = this;

            this.dataList = dataList;
            this.seriesList = this.processor.getSeriesList({ dataList: dataList, range: this.range });

            this.dataWarning = null;
            var datapointsCount = this.seriesList.reduce(function (prev, series) {
              return prev + series.datapoints.length;
            }, 0);

            if (datapointsCount === 0) {
              this.dataWarning = {
                title: 'No data points',
                tip: 'No datapoints returned from data query'
              };
            } else {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {

                for (var _iterator = this.seriesList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var series = _step.value;

                  if (series.isOutsideRange) {
                    this.dataWarning = {
                      title: 'Data points outside time range',
                      tip: 'Can be caused by timezone mismatch or missing time filter in query'
                    };
                    break;
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }

            this.annotationsPromise.then(function (result) {
              _this2.loading = false;
              _this2.alertState = result.alertState;
              _this2.annotations = result.annotations;
              _this2.render(_this2.seriesList);
            }, function () {
              _this2.loading = false;
              _this2.render(_this2.seriesList);
            });
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            if (!this.seriesList) {
              return;
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.seriesList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var series = _step2.value;

                series.applySeriesOverrides(this.panel.seriesOverrides);

                if (series.unit) {
                  this.panel.yaxes[series.yaxis - 1].format = series.unit;
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        }, {
          key: 'changeSeriesColor',
          value: function changeSeriesColor(series, color) {
            series.color = color;
            this.panel.aliasColors[series.alias] = series.color;
            this.render();
          }
        }, {
          key: 'toggleSeries',
          value: function toggleSeries(serie, event) {
            if (event.ctrlKey || event.metaKey || event.shiftKey) {
              if (this.hiddenSeries[serie.alias]) {
                delete this.hiddenSeries[serie.alias];
              } else {
                this.hiddenSeries[serie.alias] = true;
              }
            } else {
              this.toggleSeriesExclusiveMode(serie);
            }
            this.render();
          }
        }, {
          key: 'toggleSeriesExclusiveMode',
          value: function toggleSeriesExclusiveMode(serie) {
            var _this3 = this;

            var hidden = this.hiddenSeries;

            if (hidden[serie.alias]) {
              delete hidden[serie.alias];
            }

            // check if every other series is hidden
            var alreadyExclusive = _.every(this.seriesList, function (value) {
              if (value.alias === serie.alias) {
                return true;
              }

              return hidden[value.alias];
            });

            if (alreadyExclusive) {
              // remove all hidden series
              _.each(this.seriesList, function (value) {
                delete _this3.hiddenSeries[value.alias];
              });
            } else {
              // hide all but this serie
              _.each(this.seriesList, function (value) {
                if (value.alias === serie.alias) {
                  return;
                }

                _this3.hiddenSeries[value.alias] = true;
              });
            }
          }
        }, {
          key: 'toggleAxis',
          value: function toggleAxis(info) {
            var override = _.find(this.panel.seriesOverrides, { alias: info.alias });
            if (!override) {
              override = { alias: info.alias };
              this.panel.seriesOverrides.push(override);
            }
            info.yaxis = override.yaxis = info.yaxis === 2 ? 1 : 2;
            this.render();
          }
        }, {
          key: 'addSeriesOverride',
          value: function addSeriesOverride(override) {
            this.panel.seriesOverrides.push(override || {});
          }
        }, {
          key: 'removeSeriesOverride',
          value: function removeSeriesOverride(override) {
            this.panel.seriesOverrides = _.without(this.panel.seriesOverrides, override);
            this.render();
          }
        }, {
          key: 'toggleLegend',
          value: function toggleLegend() {
            this.panel.legend.show = !this.panel.legend.show;
            this.refresh();
          }
        }, {
          key: 'legendValuesOptionChanged',
          value: function legendValuesOptionChanged() {
            var legend = this.panel.legend;
            legend.values = legend.min || legend.max || legend.avg || legend.current || legend.total;
            this.render();
          }
        }, {
          key: 'exportCsv',
          value: function exportCsv() {
            var scope = this.$scope.$new(true);
            scope.seriesList = this.seriesList;
            this.publishAppEvent('show-modal', {
              templateHtml: '<export-data-modal data="seriesList"></export-data-modal>',
              scope: scope,
              modalClass: 'modal--narrow'
            });
          }
        }]);

        return GraphCtrl;
      }(MetricsPanelCtrl)));

      _export('GraphCtrl', GraphCtrl);

      _export('PanelCtrl', GraphCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
