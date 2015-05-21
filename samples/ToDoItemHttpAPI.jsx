var Marty = require('marty');
var ToDoItemActionCreators = require('actions/ToDoItemActionCreators');

var ToDoItemHttpAPI = Marty.createStateSource({
  rootUrl: '/your/api/endpoint/todoitems/',

  create: function(toDoItem) {
    this.post({
      url: this.rootUrl,
      body: toDoItem
    }).then(function(response) {
      ToDoItemActionCreators.create(response.body);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });
  },

  getAll: function() {
    this.get(
      this.rootUrl
    ).then(function(response) {
      ToDoItemActionCreators.receive(response.body);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });
  },

  getById: function(id) {
    var url = this.rootUrl + id;
    this.get(
      url
    ).then(function(response) {
      ToDoItemActionCreators.receive([response.body]);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });
  },

  update: function(id, toDoItem) {
    var url = this.rootUrl + id;
    this.put({
      url: url,
      body: toDoItem
    }).then(function(response) {
      ToDoItemActionCreators.update(response.body);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });

  },

  destroy: function(id) {
    var url = this.rootUrl + id
    this.delete(
      url
    ).then(function(response) {
      ToDoItemActionCreators.destroy(id);
    }, function(errorResponse) {
      if(errorResponse.hasBody) {
        errorResponse.json().then(function() {}, function() {});
      }
    });
  },
});

module.exports = ToDoItemHttpAPI;
