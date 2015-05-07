# marty-factory
A rails-like generation tool for the [martyjs](http://www.martyjs.org) flux implementation

This project is still under development and is not yet complete.

## Commands

Marty-Factory supports the following commands and arguments:

### Init

This command provides a convenience for creating a group of folders we use for
organization. As a result, the generated code assumes the folders created by
this command exist at the same hierarchy level.

```bash
$ marty-factory init
Creating Flux/React folders in "current directory" ...
Flux and React folders have been initialized.
```

This generates the following folders: `actions`, `constants`, `components`,
`mixins`, `stores`, and `sources`.

You may also provide a path argument to the command using `-p`.

```bash
$marty-factory init -p react
Creating Flux/React folders in "/Your/path/to/wherever/react" ...
Flux and React folders have been initialized.
```

This is simply a convenience method at this point, but will be used in the
future to generate a configuration file to allow you to run `marty-factory`
commands from anywhere inside your project and the resulting file(s) will
automatically be placed in the correct folder.

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
