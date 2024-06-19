import { Meteor } from 'meteor/meteor';
import { Todos } from './collections';
import { check } from 'meteor/check';

Meteor.methods({
  'todos.insert'(text, roomCode) {
    check(text, String);
    check(roomCode, String);
    console.log('inserting todo', text, roomCode);

    Todos.insert({
      text,
      roomCode,
      createdAt: new Date(),
      completed: false
    });
  },
  'todos.toggleComplete'(todoId) {
    check(todoId, String);

    const todo = Todos.findOne(todoId);
    Todos.update(todoId, {
      $set: {
        completed: !todo.completed
      }
    });
  },
  'todos.remove'(todoId) {
    check(todoId, String);

    Todos.remove(todoId);
  }
});
