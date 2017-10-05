module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('systemjs:build', function() {
    var Builder = require('systemjs-builder');
    var done = this.async();

    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('src/modules', './system.conf.js');
    console.log('Starting systemjs-builder');

/*
    builder
      .bundle(expression, 'dist/app_bundle.js')
      .then(function() {
        console.log('Build complete');
        done();
        grunt.task.run('concat:bundle_and_boot');
      })
      .catch(function(err) {
        console.log('Build error');
        console.log(err);
        done(false);
      });
*/
    builder.buildStatic('jquery_flot_events.js', 'dist/calcgraph/jquery_flot_events.js', {
      externals: ['jquery', 'lodash', 'angular', 'tether-drop']
    });
    builder.buildStatic('graph_tooltip.js', 'dist/calcgraph/graph_tooltip.js', {
      externals: ['jquery', 'app/core/core']
    });
    builder.buildStatic('legend.js', 'dist/calcgraph/legend.js', {
      externals: ['jquery', 'lodash', 'angular', 'jquery.flot', 'jquery.flot.time']
    });
    builder.buildStatic('series_overrides_ctrl.js', 'dist/calcgraph/series_overrides_ctrl.js', {
      externals: ['jquery', 'lodash', 'angular']
    });

  });
};
