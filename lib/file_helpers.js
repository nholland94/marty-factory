var fs = require('fs');

var FileHelpers = (function() {

  return {
    getTemplateText: function(templatePath) {
      return fs.readFileSync(templatePath, 'utf8');
    },

    writeFile: function(filePath, data) {
      return fs.writeFileSync(filePath, data);
  };

})();

module.exports = FileHelpers;
