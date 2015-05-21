var Marty = require('marty');
var ToDoItemStore = require('stores/ToDoItemStore');

var ToDoItemState = Marty.createStateMixin({
  listenTo: [ToDoItemStore],

  getState: function() {
    return {
      toDoItems: ToDoItemStore.getAll();
    }
  }
});

module.exports = ToDoItemState;
