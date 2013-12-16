var express = require('express');
var path = require('path');
var stylus = require('stylus');

module.exports = function(app) {
  // development compile Handlebars and show errors
  app.configure('development', function(){
    app.set('views', path.join(app.SERVER_ROOT, 'server', 'views'));
    app.set('view engine', 'jade');
    app.use('/javascripts', express.static(path.join(app.SERVER_ROOT, 'client', 'scripts')));
    app.use('/stylesheets', express.static(path.join(app.SERVER_ROOT, 'client', 'styles')));
    app.use('/bower_components', express.static(path.join(app.SERVER_ROOT, 'client', 'bower_components')));
    app.use(stylus.middleware({
      src: app.SERVER_ROOT + '/client',
      dest: app.SERVER_ROOT + '/public',
      compile: function(str, path, fn) {
        stylus(str)
        .set('filename', path)
        .set('compress', true)
        .render(fn);
      }
    }));
    app.use(express.errorHandler());
  });

  app.configure('production', function(){
  });
};
