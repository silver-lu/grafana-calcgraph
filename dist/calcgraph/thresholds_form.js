'use strict';

System.register(['lodash', 'app/core/core_module'], function (_export, _context) {
  "use strict";

  var _, coreModule, _createClass, ThresholdFormCtrl, template;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreCore_module) {
      coreModule = _appCoreCore_module.default;
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

      _export('ThresholdFormCtrl', ThresholdFormCtrl = function () {

        /** @ngInject */
        function ThresholdFormCtrl($scope) {
          var _this = this;

          _classCallCheck(this, ThresholdFormCtrl);

          this.panel = this.panelCtrl.panel;

          if (this.panel.alert) {
            this.disabled = true;
          }

          var unbindDestroy = $scope.$on("$destroy", function () {
            _this.panelCtrl.editingThresholds = false;
            _this.panelCtrl.render();
            unbindDestroy();
          });

          this.panelCtrl.editingThresholds = true;
        }

        _createClass(ThresholdFormCtrl, [{
          key: 'addThreshold',
          value: function addThreshold() {
            this.panel.thresholds.push({ value: undefined, colorMode: "critical", op: 'gt', fill: true, line: true });
            this.panelCtrl.render();
          }
        }, {
          key: 'removeThreshold',
          value: function removeThreshold(index) {
            this.panel.thresholds.splice(index, 1);
            this.panelCtrl.render();
          }
        }, {
          key: 'render',
          value: function render() {
            this.panelCtrl.render();
          }
        }]);

        return ThresholdFormCtrl;
      }());

      _export('ThresholdFormCtrl', ThresholdFormCtrl);

      template = '\n<div class="gf-form-group">\n  <h5>Thresholds</h5>\n  <p class="muted" ng-show="ctrl.disabled">\n    Visual thresholds options <strong>disabled.</strong>\n    Visit the Alert tab update your thresholds. <br>\n    To re-enable thresholds, the alert rule must be deleted from this panel.\n  </p>\n  <div ng-class="{\'thresholds-form-disabled\': ctrl.disabled}">\n    <div class="gf-form-inline" ng-repeat="threshold in ctrl.panel.thresholds">\n      <div class="gf-form">\n        <label class="gf-form-label">T{{$index+1}}</label>\n      </div>\n\n      <div class="gf-form">\n        <div class="gf-form-select-wrapper">\n          <select class="gf-form-input" ng-model="threshold.op"\n                  ng-options="f for f in [\'gt\', \'lt\']" ng-change="ctrl.render()" ng-disabled="ctrl.disabled"></select>\n        </div>\n        <input type="number" ng-model="threshold.value" class="gf-form-input width-8"\n               ng-change="ctrl.render()" placeholder="value" ng-disabled="ctrl.disabled">\n      </div>\n\n      <div class="gf-form">\n        <label class="gf-form-label">Color</label>\n        <div class="gf-form-select-wrapper">\n          <select class="gf-form-input" ng-model="threshold.colorMode"\n                  ng-options="f for f in [\'custom\', \'critical\', \'warning\', \'ok\']" ng-change="ctrl.render()" ng-disabled="ctrl.disabled">\n          </select>\n        </div>\n      </div>\n\n      <gf-form-switch class="gf-form" label="Fill" checked="threshold.fill"\n                      on-change="ctrl.render()" ng-disabled="ctrl.disabled"></gf-form-switch>\n\n      <div class="gf-form" ng-if="threshold.fill && threshold.colorMode === \'custom\'">\n        <label class="gf-form-label">Fill color</label>\n        <span class="gf-form-label">\n          <spectrum-picker ng-model="threshold.fillColor" ng-change="ctrl.render()" ></spectrum-picker>\n        </span>\n      </div>\n\n      <gf-form-switch class="gf-form" label="Line" checked="threshold.line"\n                      on-change="ctrl.render()" ng-disabled="ctrl.disabled"></gf-form-switch>\n\n      <div class="gf-form" ng-if="threshold.line && threshold.colorMode === \'custom\'">\n        <label class="gf-form-label">Line color</label>\n        <span class="gf-form-label">\n          <spectrum-picker ng-model="threshold.lineColor" ng-change="ctrl.render()" ></spectrum-picker>\n        </span>\n      </div>\n\n      <div class="gf-form">\n        <label class="gf-form-label">\n          <a class="pointer" ng-click="ctrl.removeThreshold($index)" ng-disabled="ctrl.disabled">\n            <i class="fa fa-trash"></i>\n          </a>\n        </label>\n      </div>\n    </div>\n\n    <div class="gf-form-button-row">\n      <button class="btn btn-inverse" ng-click="ctrl.addThreshold()" ng-disabled="ctrl.disabled">\n        <i class="fa fa-plus"></i>&nbsp;Add Threshold\n      </button>\n    </div>\n  </div>\n</div>\n';


      coreModule.directive('graphThresholdForm', function () {
        return {
          restrict: 'E',
          template: template,
          controller: ThresholdFormCtrl,
          bindToController: true,
          controllerAs: 'ctrl',
          scope: {
            panelCtrl: "="
          }
        };
      });
    }
  };
});
//# sourceMappingURL=thresholds_form.js.map
