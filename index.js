#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));
var Handlebars = require('handlebars');
var pluralize = require('pluralize');
var FileHelpers = require(path.join(__dirname+'/lib/', 'file_helpers'));

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
  console.log('Creating %s store ...', modelName);
  var context = modelContext(modelName);
  var templateText = FileHelpers.getTemplateText('./templates/store.tmpl');

  var template = Handlebars.compile(templateText);
  var output = template(context);

  var fileName = modelName + 'Store.jsx';
  console.log("Writing file '%s' ...", fileName);
  /*
   * We should have a standard structure if options aren't provided to specify
   * where the store should be created:
   * - react
   *   - actions
   *   - components
   *   - constants
   *   - mixins
   *   - sources
   *   - stores
   * Then if we haven't read in some sort of .marty-factory file where those are
   * specified, we can assume this structure (and it can be overridden with the
   * command line arg
   */
  FileHelpers.writeFile(fileName, output);

  console.log('%s store created successfully.', modelName);
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

program.parse(process.argv);
