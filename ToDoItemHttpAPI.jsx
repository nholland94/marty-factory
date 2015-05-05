var Marty = require('marty');
var ToDoItemActionCreators =
var ToDoItemActionCreators = require(../actions/ToDoItemActionCreators);

var ToDoItemHttpAPI = Marty.createStateSource({
  create: function(toDoItem) {
    this.post({
      url: 'http://endpoint.com/service/',
      body: toDoItem
    }).then(function(response) {
      ToDoItemActionCreators.createToDoItem(response.body);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });
  },

  readAll: function() {
    this.get(
      'http://endpoint.com/service/'
    ).then(function(response) {
      ToDoItemActionCreators.readAllToDoItems(response.body);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });
  },

  update: function(toDoItem) {
    this.put({
      url: 'http://endpoint.com/service/' + toDoItem.id,
      body: toDoItem
    }).then(function(response) {
      ToDoItemActionCreators.updateToDoItem(response.body);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });

  },

  destroy: function(toDoItem) {
    this.delete(
      'http://endpoint.com/service/' + toDoItem.id
    ).then(function(response) {
      ToDoItemAcionCreators.destroyToDoItem(response.body);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });
  },
});

module.exports = ToDoItemHttpAPI;
