'use strict';

System.register(['app/core/utils/kbn'], function (_export, _context) {
  "use strict";

  var kbn, _createClass, AxesEditorCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /** @ngInject **/
  function axesEditorComponent() {
    'use strict';

    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'public/plugins/calcgraph/tpl/axes_editor.html',
      controller: AxesEditorCtrl
    };
  }

  _export('axesEditorComponent', axesEditorComponent);

  return {
    setters: [function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
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

      _export('AxesEditorCtrl', AxesEditorCtrl = function () {

        /** @ngInject **/
        function AxesEditorCtrl($scope, $q) {
          _classCallCheck(this, AxesEditorCtrl);

          this.panelCtrl = $scope.ctrl;
          this.panel = this.panelCtrl.panel;
          $scope.ctrl = this;

          this.unitFormats = kbn.getUnitFormats();

          this.logScales = {
            'linear': 1,
            'log (base 2)': 2,
            'log (base 10)': 10,
            'log (base 32)': 32,
            'log (base 1024)': 1024
          };

          this.xAxisModes = {
            'Time': 'time',
            'Series': 'series',
            'Histogram': 'histogram'
            // 'Data field': 'field',
          };

          this.xAxisStatOptions = [{ text: 'Avg', value: 'avg' }, { text: 'Min', value: 'min' }, { text: 'Max', value: 'max' }, { text: 'Total', value: 'total' }, { text: 'Count', value: 'count' }, { text: 'Current', value: 'current' }];

          if (this.panel.xaxis.mode === 'custom') {
            if (!this.panel.xaxis.name) {
              this.panel.xaxis.name = 'specify field';
            }
          }
        }

        _createClass(AxesEditorCtrl, [{
          key: 'setUnitFormat',
          value: function setUnitFormat(axis, subItem) {
            axis.format = subItem.value;
            this.panelCtrl.render();
          }
        }, {
          key: 'render',
          value: function render() {
            this.panelCtrl.render();
          }
        }, {
          key: 'xAxisOptionChanged',
          value: function xAxisOptionChanged() {
            if (!this.panel.xaxis.values || !this.panel.xaxis.values[0]) {
              this.panelCtrl.processor.setPanelDefaultsForNewXAxisMode();
            }
            this.panelCtrl.onDataReceived(this.panelCtrl.dataList);
          }
        }, {
          key: 'getDataFieldNames',
          value: function getDataFieldNames(onlyNumbers) {
            var props = this.panelCtrl.processor.getDataFieldNames(this.panelCtrl.dataList, onlyNumbers);
            var items = props.map(function (prop) {
              return { text: prop, value: prop };
            });

            return this.$q.when(items);
          }
        }]);

        return AxesEditorCtrl;
      }());

      _export('AxesEditorCtrl', AxesEditorCtrl);
    }
  };
});
//# sourceMappingURL=axes_editor.js.map
