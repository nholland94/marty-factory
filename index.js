#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));
var Handlebars = require('handlebars');
var pluralize = require('pluralize');

var merge = function(base) {
  var otherObjects = arguments.splice(0, 1);

  for(var i in otherObjects) {
    var otherObject = otherObjects[i];

    for(var key in otherObject) {
      base[key] = otherObject[key];
    }
  }

  return base;
};

var fail = function(failureMessage) {
  console.error(failureMessage);
  process.exit(1);
};

var capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var isCapitalized = function(character) {
  return character === character.toUpperCase();
}

var modelContext = function(modelName) {
  if(!isCapitalized(modelName.charAt(0))) {
    fail('Model name must be in CamelCase');
  }

  return {
    modelName: modelName,
    pluralModelName: pluralize(modelName),
    modelVariableName: capitalizeFirstLetter(modelName),
    pluralModelVariableName: pluralize(capitalizeFirstLetter(modelName))
  };
};

var generateStore = function(modelName) {
  var context = modelContext(modelName);
};

var SourceGenerators = {
  http: function(modelName) {

  }
};

var generateSource = function(sourceType, modelName) {
  if(!(sourceType in SourceGenerators)) {
    fail('Sorry, but only the http source is supported right now');
  }

  SourceGenerators[sourceType](modelName);
};

var program = require('commander');

program.version(pkg.version);

program
  .command('store <modelName>')
  .description('Generate a store and state mixin.')
  .action(generateStore);

program
  .command('source <sourceType> <modelName>')
  .description('Generate a source of the specified type.')
  .action(generateSource);
