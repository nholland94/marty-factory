#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));
var Handlebars = require('handlebars');
var pluralize = require('pluralize');
var FileHelpers = require(path.join(__dirname+'/lib/', 'file_helpers'));

var fluxFolders = [
  'actions', 'constants', 'components', 'mixins', 'stores', 'sources'
];

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

var lowerCaseFirstLetter = function(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

var capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var isCapitalized = function(character) {
  return character === character.toUpperCase();
};

var underscoreModelName = function(modelName) {
  return modelName.split(/(?=[A-Z])/).join('_');
};

var modelContext = function(modelName, endpoint) {
  if(!isCapitalized(modelName.charAt(0))) {
    fail('Model name must be in CamelCase');
  }

  var underscoredName = underscoreModelName(modelName).toUpperCase();
  var underscoredPluralName = underscoreModelName(pluralize(modelName)).toUpperCase();
  return {
    modelName: modelName,
    pluralModelName: pluralize(modelName),
    paramModelName: lowerCaseFirstLetter(modelName),
    paramModelNamePlural: lowerCaseFirstLetter(pluralize(modelName)),
    modelVariableName: capitalizeFirstLetter(modelName),
    pluralModelVariableName: pluralize(capitalizeFirstLetter(modelName)),
    constantsName: modelName + 'Constants',
    receiveModelConstant: 'RECEIVE_' + underscoredPluralName,
    addModelConstant: 'ADD_' + underscoredName,
    updateModelConstant: 'UPDATE_' + underscoredName,
    removeModelConstant: 'REMOVE_' + underscoredName,
    storeName: modelName + 'Store',
    stateName: modelName + 'State',
    sourceEndpoint: endpoint ? endpoint : ''
  };
};

var generateTemplateOutput = function(modelName, templatePath, endpoint) {
  var context = modelContext(modelName, endpoint);
  var templateText = FileHelpers.getTemplateText(templatePath);

  var template = Handlebars.compile(templateText);
  return template(context);
};

var generateStore = function(modelName) {
  console.log('Creating %s store ...', modelName);
  var output = generateTemplateOutput(modelName, './templates/store.tmpl');

  var fileName = modelName + 'Store.jsx';
  console.log("Writing file '%s' ...", fileName);

  FileHelpers.writeFile(fileName, output);

  console.log('%s store created successfully.', modelName);
};

var generateConstants = function(modelName) {
  console.log('Creating %s constants ...', modelName);
  var output = generateTemplateOutput(modelName, './templates/constants.tmpl');

  var fileName = modelName + 'Constants.jsx';
  console.log('Writing file "%s" ...', fileName);

  FileHelpers.writeFile(fileName, output);

  console.log('%s constants created successfully.', modelName);
};

var SourceGenerators = {
  http: function(modelName) {

  }
};

var generateSource = function(sourceType, modelName, url) {
  if(!(sourceType in SourceGenerators)) {
    fail('Sorry, but only the http source is supported right now');
  }

  // Future enhancement
  // SourceGenerators[sourceType](modelName);
  console.log('Creating %s source ...', modelName);
  var output = generateTemplateOutput(modelName, './templates/source.tmpl', url.endpoint);

  var fileName = modelName + 'HttpAPI.jsx';
  console.log("Writing file '%s' ...", fileName);

  FileHelpers.writeFile(fileName, output);

  console.log('%s source created successfully.', modelName);
};

var generateComponent = function(modelName) {
  console.log('Creating %s component ...', modelName);
  var output = generateTemplateOutput(modelName, './templates/component.tmpl');

  var fileName = modelName + '.jsx';
  console.log("Writing file '%s' ...", fileName);

  FileHelpers.writeFile(fileName, output);

  console.log('%s component created successfully.', modelName);
};

var generateStateMixin = function(modelName) {
  console.log('Creating %s state mixin ...', modelName);
  var output = generateTemplateOutput(modelName, './templates/state_mixin.tmpl');

  var fileName = modelName + 'State' + '.jsx';
  console.log("Writing file '%s' ...", fileName);

  FileHelpers.writeFile(fileName, output);

  console.log('%s state mixin created successfully.', modelName);
};

var initFolders = function(folderPath) {
  console.log('Creating Flux/React folders in "%s" ...', path.path ? path.path : 'current directory');

  var targetPath = folderPath.path ? folderPath.path : path.join(__dirname, '/');

  fluxFolders.forEach(function(folderName) {
    var result = FileHelpers.createDirectory(targetPath, folderName);
    if(result) {
      console.log('%s created successfully.', folderName);
    }
  });

  console.log('Flux and React folders have been initialized.');
};

var program = require('commander');

program.version(pkg.version);

program
  .command('component <modelName>')
  .description('Generate a component.')
  .action(generateComponent);

program
  .command('constants <modelName>')
  .description('Generate constants for a model.')
  .action(generateConstants);

program
  .command('init')
  .option('-p, --path [folderPath]', 'Path to place Flux/React folders')
  .description('Creates the Actions, Constants, Components, Mixins, Sources, and Stores folders in the current directory or the folder specified by -p')
  .action(initFolders);

program
  .command('source <sourceType> <modelName>')
  .option('-e, --endpoint [url]', 'API endpoint for model')
  .description('Generate a source of the specified type.')
  .action(generateSource);

program
  .command('state-mixin <modelName>')
  .description('Generate a state mixin for the specified model.')
  .action(generateStateMixin);

program
  .command('store <modelName>')
  .description('Generate a store and state mixin.')
  .action(generateStore);

program.parse(process.argv);
