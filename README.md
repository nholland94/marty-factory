# marty-factory
A rails-like generation tool for the [martyjs](http://www.martyjs.org) flux implementation

This project is still under development and is not yet complete.

## Commands

Marty-Factory supports the following commands and arguments:

### Component

You may generate a component by navigating to the directory where you would like
the file generated. Once there, execute the following:

```bash
$ marty-factory component ToDoItem
Creating ToDoItem component ...
Writing file 'ToDoItem.jsx' ...
ToDoItem component created successfully.
```

### Constants

You may generate a constants file by navigating to the directory where you would like
the file generated. Once there, execute the following:

```bash
$ marty-factory constants ToDoItem
Creating ToDoItem constants ...
Writing file 'ToDoItemConstants.jsx' ...
ToDoItem constants created successfully.
```

### Source

You may generate a source by navigating to the directory where you would like
the file generated. **Currently only HTTP sources are supported.** Once there, execute the following:

```bash
$ marty-factory source http ToDoItem
Creating ToDoItem source ...
Writing file 'ToDoItemHttpAPI.jsx' ...
ToDoItem source created successfully.
```

### State Mixin

You may generate a state mixin by navigating to the directory where you would like
the file generated. Once there, execute the following:

```bash
$ marty-factory state-mxing ToDoItem
Creating ToDoItem state mixin ...
Writing file 'ToDoItemState.jsx' ...
ToDoItem state mixin created successfully.
```

### Store

You may generate a store by navigating to the directory where you would like
the file generated. Once there, execute the following:

```bash
$ marty-factory store ToDoItem
Creating ToDoItem store ...
Writing file 'ToDoItemStore.jsx' ...
ToDoItem store created successfully.
```
