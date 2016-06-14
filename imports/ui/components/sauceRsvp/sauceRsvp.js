import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';

import { Meteor } from 'meteor/meteor';

import template from './sauceRsvp.html';

class SauceRsvp {
	yes() {
		this.answer('yes');
	}
	isYes() {
		return this.isAnswer('yes');
	}

	maybe() {
		this.answer('maybe');
	}
	isMaybe() {
		return this.isAnswer('maybe');
	}

	no() {
		this.answer('no');
	}
	isNo() {
		return this.isAnswer('no');
	}

	answer(answer) {
		Meteor.call('rsvp', this.sauce._id, answer, (error) => {
			if(error) {
				console.error('Oops, unable to rsvp!');
			} else {
				console.log('RSVP done!');
			}
		});
	}
	isAnswer(answer) {
		if(this.sauce) {
			return !!_.findWhere(this.sauce.rsvps, {
				user: Meteor.userId(),
				rsvp: answer
			});
		}
	}
}

const name = 'sauceRsvp';

export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    sauce: '<'
  },
  controller: SauceRsvp
});