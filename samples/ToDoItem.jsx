var React = require('react');
var ToDoItemStore = require('stores/ToDoItemStore');
var ToDoItemState = require('mixins/ToDoItemState');

var ToDoItem = React.createClass({
  mixins: [ToDoItemState],

  propTypes: {

  },

  getDefaultProps: function() {
    return {

    };
  },

  getInitialState: function() {

  },

  render: function() {
    return (
      <div />
    );
  },

  componentWillMount: function() {

  },

  componentDidMount: function() {

  },

  componentWillReceiveProps: function(nextProps) {

  },

  componentShouldUpdate: function(nextProps, nextState) {

  },

  componentWillUpdate: function(nextProps, nextState) {

  },

  componentDidUpdate: function(prevProps, prevState) {

  },

  componentWillUnmount: function() {

  }
});

module.exports = ToDoItem;
