"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var template;
  return {
    setters: [],
    execute: function () {
      template = "\n<div class=\"graph-wrapper\" ng-class=\"{'graph-legend-rightside': ctrl.panel.legend.rightSide}\">\n  <div class=\"graph-canvas-wrapper\">\n\n    <div class=\"datapoints-warning\" ng-if=\"ctrl.dataWarning\">\n      <span class=\"small\" bs-tooltip=\"ctrl.dataWarning.tip\">{{ctrl.dataWarning.title}}</span>\n    </div>\n\n    <div grafana-graph class=\"histogram-chart\" ng-dblclick=\"ctrl.zoomOut()\">\n    </div>\n\n  </div>\n\n  <div class=\"graph-legend-wrapper\" graph-legend></div>\n  </div>\n\n<div class=\"clearfix\"></div>\n";

      _export("default", template);
    }
  };
});
//# sourceMappingURL=template.js.map
