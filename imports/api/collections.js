import { Mongo } from 'meteor/mongo';

export const Todos = new Mongo.Collection('todos');

Todos.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
    });
