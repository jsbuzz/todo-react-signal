import { defineEventType } from "../../react-signal/event-hive/event-type";
import { basicEvent } from "../../react-signal/event-hive/event";

export const AddTodoEvent = defineEventType({
  title: String
});

export const TodoEvent = defineEventType({
  todo: Object
});

export const TodoRestoreEvent = defineEventType({
  savedTodos: Array
});

export const IdEvent = defineEventType({
  id: Number
});

export const AddTodo = AddTodoEvent.withAlias("Todo:add");
export const RemoveTodo = IdEvent.withAlias("Todo:remove");
export const UpdateTodo = TodoEvent.withAlias("Todo:update");
export const RestoreTodos = TodoRestoreEvent.withAlias("Todo:restore");

export const TodoUpdated = id => basicEvent(`Todo:Updated#${id}`);

export const UpdateActive = defineEventType({
  active: Number
}).withAlias("App:UpdateActive");
