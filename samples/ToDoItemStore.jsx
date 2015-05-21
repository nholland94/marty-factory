var Marty = require('marty');
var ToDoItemConstants = require('constants/ToDoItemConstants');

var ToDoItemStore = Marty.createStore({
  displayName: 'ToDoItemStore',

  handlers: {
    create: ToDoItemConstants.CREATE_TO_DO_ITEM,
    receive: ToDoItemConstants.RECEIVE_TO_DO_ITEMS,
    update: ToDoItemConstants.UPDATE_TO_DO_ITEM,
    destroy: ToDoItemConstants.DESTROY_TO_DO_ITEM
  },

  getInitialState: function() {
    return {};
  },

  create: function(toDoItem) {
    this.state[toDoItem.id] = toDoItem;
    this.hasChanged();
  },

  receive: function(toDoItems) {
    var store = this;

    toDoItems.forEach(function(toDoItem) {
      store.state[toDoItem.id] = toDoItem;
    });

    this.hasChanged();
  },

  update: function(id, toDoItem) {
    this.state[id] = toDoItem;
    this.hasChanged();
  },

  destroy: function(id) {
    delete this.state[id];
    this.hasChanged();
  },

  getAll: function() {
    varr store = this;
    return Object.keys(this.state).map(function(key) {
      return store.state[key];
    });
  },

  get: function(id) {
    return this.state[id];
  }
});

module.exports = ToDoItemStore;
