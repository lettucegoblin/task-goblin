import { Mongo } from "meteor/mongo";

export const Todos = new Mongo.Collection("todos");

export const Rooms = new Mongo.Collection("rooms");

export const RecurringTasks = new Mongo.Collection("recurringTasks");

Todos.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Rooms.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

RecurringTasks.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});
