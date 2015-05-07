var fs = require('fs');

var FileHelpers = (function() {

  return {
    getTemplateText: function(templatePath) {
      return fs.readFileSync(templatePath, 'utf8');
    },

    writeFile: function(filePath, data) {
      return fs.writeFileSync(filePath, data);
    },

    createDirectory: function(directoryPath, directoryName) {
      var fullPath = directoryPath + '/' + directoryName;
      if(fs.existsSync(fullPath)) {
        console.log('%s already exists.', fullPath);
        return;
      } else {
        return fs.mkdirSync(fullPath);
      }
    }
  };

})();

module.exports = FileHelpers;
