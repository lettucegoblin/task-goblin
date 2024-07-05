import { Meteor } from "meteor/meteor";
import { Todos, RecurringTasks } from "./collections";
import { check } from "meteor/check";

Meteor.methods({
  "todos.insert"(text, roomCode) {
    check(text, String);
    check(roomCode, String);
    console.log("inserting todo", text, roomCode);

    Todos.insert({
      text,
      roomCode,
      createdAt: new Date(),
      completed: false,
    });
  },
  "todos.toggleComplete"(todoId) {
    check(todoId, String);

    const todo = Todos.findOne(todoId);
    Todos.update(todoId, {
      $set: {
        completed: !todo.completed,
      },
    });
  },
  "todos.remove"(todoId) {
    check(todoId, String);

    Todos.remove(todoId);
  },
  "recurringTasks.insert"(task, roomCode) {
    check(roomCode, String);

    console.log("inserting recurring task", task, roomCode);

    RecurringTasks.insert({
      task,
      roomCode,
      createdAt: new Date(),
      lastCompleted: null,
    });
  },
  "recurringTasks.update"(taskId, task, roomCode) {
    check(roomCode, String);

    console.log("updating recurring task", task, roomCode);

    RecurringTasks.update(
      { _id: taskId, roomCode: roomCode },
      {
        $set: {
          task: task,
        },
      }
    );
  },
});
