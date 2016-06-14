import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';

import { Meteor } from 'meteor/meteor';

import template from './sauceUnanswered.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';

class SauceUnanswered {
	getUnanswered() {
		if(!this.sauce || !this.sauce.invited) {
			return;
		}

		return this.sauce.invited.filter((user) => {
			return !_.findWhere(this.sauce.rsvps, { user });
		});
	}

	getUserById(userId) {
		return Meteor.users.findOne(userId);
	}
}

const name = 'sauceUnanswered';

export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    sauce: '<'
  },
  controller: SauceUnanswered
});