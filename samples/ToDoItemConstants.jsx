var Marty = require('marty');

var ToDoItemConstants = Marty.createConstants([
  'CREATE_TO_DO_ITEM',
  'RECEIVE_TO_DO_ITEMS',
  'UPDATE_TO_DO_ITEM',
  'DESTROY_TO_DO_ITEM'
]);

module.exports = ToDoItemConstants;
