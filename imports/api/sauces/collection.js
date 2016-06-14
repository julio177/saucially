import { Mongo } from 'meteor/mongo';

export const Sauces = new Mongo.Collection('sauces');

Sauces.allow({
  insert(userId, sauce) {
    return userId && sauce.owner === userId;
  },
  update(userId, sauce, fields, modifier) {
    return userId && sauce.owner === userId;
  },
  remove(userId, sauce) {
    return userId && sauce.owner === userId;
  }
});