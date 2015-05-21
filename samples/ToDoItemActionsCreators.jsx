var Marty = require('marty');
var ToDoItemConstants = require('constants/ToDoItemConstants');

var ToDoItemActionCreators = Marty.createActionCreators({
  create: function(toDoItem) {
    this.dispatch(ToDoItemConstants.CREATE_TO_DO_ITEM, toDoItem);
  },

  receive: function(toDoItems) {
    this.dispatch(ToDoItemConstants.RECEIVE_TO_DO_ITEMS, toDoItems);
  },

  update: function(id, toDoItem) {
    this.dispatch(ToDoItemConstants.UPDATE_TO_DO_ITEM, id, toDoItem);
  },

  destroy: function(id) {
    this.dispatch(ToDoItemConstants.DESTROY_TO_DO_ITEM, id);
  }
});

module.exports = ToDoItemActionCreators;
