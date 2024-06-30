import { Meteor } from 'meteor/meteor';
import { 
  Todos,
  Rooms,
  RecurringTasks  
 } from '../imports/api/collections';
import '../imports/api/methods';

Meteor.publish('todos', function (roomCode) {
  return Todos.find({ roomCode });
});

Meteor.publish('rooms', function () {
  return Rooms.find({});
});

Meteor.publish('recurringTasks', function (roomCode) {
  return RecurringTasks.find({ roomCode });
});



Meteor.startup(() => {
  // Code to run on server startup
});
