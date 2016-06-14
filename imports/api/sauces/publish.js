import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Sauces } from './collection';

if (Meteor.isServer) {
  Meteor.publish('sauces', function(options, searchString) {
    const selector = {
      $or: [{
        // the public sauces
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }, {
        $and: [{
          invited: this.userId
        }, {
          invited: {
            $exists: true
          }
        }]
      }]
    };

    if(typeof searchString === 'string' && searchString.length) {
      selector.search = {
        $regex: `.*${searchString}.*`,
        $options: 'i'
      }
    }

    Counts.publish(this, 'numberOfSauces', Sauces.find(selector), {
      noReady: true
    });
    return Sauces.find(selector, options);
  });
}