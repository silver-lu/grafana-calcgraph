'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _;

  /**
   * Convert series into array of series values.
   * @param data Array of series
   */
  function getSeriesValues(data) {
    var values = [];

    // Count histogam stats
    for (var i = 0; i < data.length; i++) {
      var series = data[i];
      for (var j = 0; j < series.data.length; j++) {
        if (series.data[j][1] !== null) {
          values.push(series.data[j][1]);
        }
      }
    }

    return values;
  }

  /**
   * Convert array of values into timeseries-like histogram:
   * [[val_1, count_1], [val_2, count_2], ..., [val_n, count_n]]
   * @param values
   * @param bucketSize
   */

  _export('getSeriesValues', getSeriesValues);

  function convertValuesToHistogram(values, bucketSize) {
    var histogram = {};

    for (var i = 0; i < values.length; i++) {
      var bound = getBucketBound(values[i], bucketSize);
      if (histogram[bound]) {
        histogram[bound] = histogram[bound] + 1;
      } else {
        histogram[bound] = 1;
      }
    }

    var histogam_series = _.map(histogram, function (count, bound) {
      return [Number(bound), count];
    });

    // Sort by Y axis values
    return _.sortBy(histogam_series, function (point) {
      return point[0];
    });
  }
  _export('convertValuesToHistogram', convertValuesToHistogram);

  function getBucketBound(value, bucketSize) {
    return Math.floor(value / bucketSize) * bucketSize;
  }return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=histogram.js.map
