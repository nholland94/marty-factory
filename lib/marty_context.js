var assign = require('object_assign');
var fs = require('fs');

var componentMetadata = {
  action: {
    longName: 'ActionCreator',
    template: 'action_creator.tmpl'
  },
  constants: {
    longName: 'Constants',
    template: 'constants.tmpl'
  },
  mixin: {
    longName: 'StateMixin',
    template: 'state_mixin.tmpl'
  },
  source: {
    longName: 'HttpAPI',
    template: 'source.tmpl'
  },
  store: {
    longName: 'Store',
    template: 'store.tmpl'
  }
}

var MartyComponent = function(componentName, modelName) {
  this.name = componentName;
  this.modelName = modelName;
  this.componentMetadata = componentMetadata[componentName];
};

MartyContext.prototype = assign({}, MartyContext.prototype, {
  filepath: function() {
    return pluralize(this.componentMetadata.longName) + modelName;
  },

  exists: function() {
    return fs.existsSync(this.filepath());
  },

  generate: function() {
  }
});

module.exports = contexts;
