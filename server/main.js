import { Meteor } from 'meteor/meteor';
import { Todos } from '../imports/api/collections';
import '../imports/api/methods';

Meteor.publish('todos', function (roomCode) {
  return Todos.find({ roomCode });
});

Meteor.startup(() => {
  // Code to run on server startup
});
